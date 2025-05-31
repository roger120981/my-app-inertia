<?php

namespace App\Tables;

use App\Models\CaseManager;
use InertiaUI\Table\Action;
use InertiaUI\Table\Columns;
use InertiaUI\Table\Export;
use InertiaUI\Table\Filters;
use InertiaUI\Table\Table;
use InertiaUI\Table\Url;

class CaseManagers extends Table
{
    protected ?string $resource = CaseManager::class;

    protected ?string $defaultSort = 'name';

    protected array|string $search = ['name', 'email', 'phone'];

    public function columns(): array
    {
        return [
            Columns\TextColumn::make('name', 'Full Name', sortable: true),
            Columns\TextColumn::make('email', sortable: true),
            Columns\TextColumn::make('phone', sortable: true),
            Columns\TextColumn::make('agency.name', 'Agency', sortable: true),            
            Columns\DateColumn::make('created_at', 'Created', sortable: true),
            Columns\ActionColumn::new(),
        ];
    }

    public function filters(): array
    {
        return [
            Filters\TextFilter::make('name', 'Full Name'),
            Filters\TextFilter::make('email'),
            Filters\TextFilter::make('phone'),
            
        ];
    }

    public function actions(): array
    {
        return [
            Action::make('View', fn (CaseManager $caseManager, Url $url) => $url
                ->route('case-managers.show', $caseManager)
            )
                ->dataAttributes(['view', 'navigate' => true])
                ->icon('EyeIcon'),

            Action::make('Edit', fn (CaseManager $caseManager, Url $url) => $url
                ->route('case-managers.edit', $caseManager)
            )
                ->dataAttributes(['edit', 'navigate' => true])
                ->icon('PencilIcon'),

            Action::make('Delete', handle: fn (CaseManager $caseManager) => $caseManager->delete())
                ->confirm(
                    title: 'Delete Case Manager',
                    message: 'Are you sure you want to delete this case manager?',
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
        return CaseManager::with(['agency'])
            ->withCount(['participants']);
    }
}
