<?php

namespace App\Tables;

use App\Models\Agency;
use InertiaUI\Table\Action;
use InertiaUI\Table\Columns;
use InertiaUI\Table\Export;
use InertiaUI\Table\Filters;
use InertiaUI\Table\Table;
use InertiaUI\Table\Url;

class Agencies extends Table
{
    protected ?string $resource = Agency::class;

    protected ?string $defaultSort = 'name';

    protected array|string $search = ['name', 'email', 'contact_person'];

    public function columns(): array
    {
        return [
            Columns\TextColumn::make('name', 'Agency Name', sortable: true),
            Columns\TextColumn::make('contact_person', 'Contact Person', sortable: true),
            Columns\TextColumn::make('email', 'Email', sortable: true),
            Columns\TextColumn::make('phone', 'Phone'),
            Columns\TextColumn::make('city', 'City'),
            Columns\TextColumn::make('state', 'State'),
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
            Filters\TextFilter::make('name', 'Agency Name'),
            Filters\TextFilter::make('contact_person', 'Contact Person'),
            Filters\TextFilter::make('email', 'Email'),
            Filters\TextFilter::make('phone', 'Phone'),
            Filters\TextFilter::make('city', 'City'),
            Filters\TextFilter::make('state', 'State'),
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
            Action::make('View', fn (Agency $agency, Url $url) => $url
                ->route('agencies.show', $agency)
            )
                ->dataAttributes(['view', 'navigate' => true])
                ->icon('EyeIcon'),

            Action::make('Edit', fn (Agency $agency, Url $url) => $url
                ->route('agencies.edit', $agency)
            )
                ->dataAttributes(['edit', 'navigate' => true])
                ->icon('PencilIcon'),

            Action::make('Delete', handle: fn (Agency $agency) => $agency->delete())
                ->confirm(
                    title: 'Delete Agency',
                    message: 'Are you sure you want to delete this agency?',
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
        return Agency::withCount(['services', 'caseManagers']);
    }
}
