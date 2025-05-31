<?php

namespace App\Tables;

use App\Models\Participant;
use InertiaUI\Table\Action;
use InertiaUI\Table\Columns;
use InertiaUI\Table\Export;
use InertiaUI\Table\Filters;
use InertiaUI\Table\Table;
use InertiaUI\Table\Url;

class Participants extends Table
{
    protected ?string $resource = Participant::class;

    protected ?string $defaultSort = 'name';

    protected array|string $search = ['name', 'medicaid_id', 'primary_phone'];

    public function columns(): array
    {
        return [
            Columns\TextColumn::make('name', 'Full Name', sortable: true),
            Columns\TextColumn::make('medicaid_id', 'Medicaid ID', sortable: true),
            // Columns\TextColumn::make('gender', 'Gender', sortable: true)
            //     ->transform(fn($value) => ucfirst($value)),
            Columns\DateColumn::make('dob', 'Date of Birth', sortable: true),
            Columns\TextColumn::make('primary_phone', 'Primary Phone'),
            Columns\TextColumn::make('community', 'Community'),
            Columns\BooleanColumn::make('is_active', 'Active', sortable: true),
            Columns\TextColumn::make('caseManager.name', 'Case Manager', sortable: true),
            Columns\DateColumn::make('created_at', 'Created', sortable: true),
            Columns\ActionColumn::new(),
        ];
    }

    public function filters(): array
    {
        return [
            Filters\TextFilter::make('name', 'Full Name'),
            Filters\TextFilter::make('medicaid_id', 'Medicaid ID'),
            // Filters\SelectFilter::make('gender', 'Gender')
            //     ->options([
            //         'male' => 'Male',
            //         'female' => 'Female',
            //         'other' => 'Other',
            //     ]),
            Filters\TextFilter::make('primary_phone', 'Primary Phone'),
            Filters\TextFilter::make('community', 'Community'),
            Filters\BooleanFilter::make('is_active', 'Active'),
            Filters\DateFilter::make('created_at')->nullable(),
        ];
    }

    public function actions(): array
    {
        return [
            Action::make('View', fn (Participant $participant, Url $url) => $url
                ->route('participants.show', $participant)
            )
                ->dataAttributes(['view', 'navigate' => true])
                ->icon('EyeIcon'),

            Action::make('Edit', fn (Participant $participant, Url $url) => $url
                ->route('participants.edit', $participant)
            )
                ->dataAttributes(['edit', 'navigate' => true])
                ->icon('PencilIcon'),

            Action::make('Delete', handle: fn (Participant $participant) => $participant->delete())
                ->confirm(
                    title: 'Delete Participant',
                    message: 'Are you sure you want to delete this participant?',
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
        return parent::query()->with('caseManager');
    }
}
