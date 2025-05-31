<?php

namespace App\Tables;

use App\Models\Caregiver;
use InertiaUI\Table\Action;
use InertiaUI\Table\Columns;
use InertiaUI\Table\Export;
use InertiaUI\Table\Filters;
use InertiaUI\Table\Table;
use InertiaUI\Table\Url;

class Caregivers extends Table
{
    protected ?string $resource = Caregiver::class;

    protected ?string $defaultSort = 'name';

    protected array|string $search = ['name', 'email'];

    public function columns(): array
    {
        return [
            Columns\TextColumn::make('name', 'Full Name', sortable: true),
            Columns\TextColumn::make('email', sortable: true),
            Columns\TextColumn::make('phone', 'Phone Number'),
            Columns\TextColumn::make('available_hours', 'Available Hours'),
            Columns\BooleanColumn::make('is_active', 'Active')
                ->trueLabel('Active')
                ->falseLabel('Inactive'),
            Columns\DateColumn::make('created_at', 'Created', sortable: true),
            Columns\ActionColumn::new(),
        ];
    }

    public function filters(): array
    {
        return [
            Filters\TextFilter::make('name', 'Full Name'),
            Filters\TextFilter::make('email'),
            Filters\TextFilter::make('phone', 'Phone Number'),
            Filters\SetFilter::make('is_active', 'Status')->options([
                '1' => 'Active',
                '0' => 'Inactive',
            ]),
            Filters\DateFilter::make('created_at')->nullable(),
        ];
    }

    public function actions(): array
    {
        return [
            Action::make('View', fn (Caregiver $caregiver, Url $url) => $url
                ->route('caregivers.show', $caregiver)
            )
                ->dataAttributes(['view', 'navigate' => true])
                ->icon('EyeIcon'),

            Action::make('Edit', fn (Caregiver $caregiver, Url $url) => $url
                ->route('caregivers.edit', $caregiver)
            )
                ->dataAttributes(['edit', 'navigate' => true])
                ->icon('PencilIcon'),

            Action::make('Delete', handle: fn (Caregiver $caregiver) => $caregiver->delete())
                ->confirm(
                    title: 'Delete Caregiver',
                    message: 'Are you sure you want to delete this caregiver?',
                    confirmButton: 'Delete',
                    cancelButton: 'Cancel'
                )
                ->asDangerButton(),
        ];
    }

    public function exports(): array
    {
        return [
            Export::make()
                ->limitToFilteredRows()
                ->limitToSelectedRows(),
        ];
    }

    public function query()
    {
        return Caregiver::withCount(['services']);
    }
}
