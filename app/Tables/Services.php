<?php

namespace App\Tables;

use App\Models\Service;
use InertiaUI\Table\Action;
use InertiaUI\Table\Columns;
use InertiaUI\Table\Export;
use InertiaUI\Table\Filters;
use InertiaUI\Table\Table;
use InertiaUI\Table\Url;

class Services extends Table
{
    protected ?string $resource = Service::class;

    protected ?string $defaultSort = 'created_at';

    protected array|string $search = ['type', 'status'];

    public function columns(): array
    {
        return [
            Columns\TextColumn::make('type', 'Service Type', sortable: true),
            Columns\TextColumn::make('participant.name', 'Participant', sortable: true),
            Columns\TextColumn::make('agency.name', 'Agency', sortable: true),
            Columns\TextColumn::make('weekly_hours', 'Weekly Hours', sortable: true),
            Columns\TextColumn::make('weekly_units', 'Weekly Units', sortable: true),
            Columns\TextColumn::make('status', 'Status', sortable: true),
            Columns\DateColumn::make('start_date', 'Start Date', sortable: true),
            Columns\DateColumn::make('end_date', 'End Date', sortable: true),
            Columns\DateColumn::make('created_at', 'Created', sortable: true),
            Columns\ActionColumn::new(),
        ];
    }

    public function filters(): array
    {
        return [
            Filters\SetFilter::make('type', 'Service Type')->options([
                'Home Care' => 'Home Care',
                'HDM' => 'HDM',
                'ADHC' => 'ADHC',
            ]),
            Filters\SetFilter::make('status', 'Status')->options([
                'pending' => 'Pending',
                'approved' => 'Approved',
                'active' => 'Active',
                'expired' => 'Expired',
            ]),
            Filters\DateFilter::make('start_date', 'Start Date')->nullable(),
            Filters\DateFilter::make('end_date', 'End Date')->nullable(),
            Filters\DateFilter::make('created_at')->nullable(),
        ];
    }

    public function actions(): array
    {
        return [
            Action::make('View', fn (Service $service, Url $url) => $url
                ->route('services.show', $service)
            )
                ->dataAttributes(['view', 'navigate' => true])
                ->icon('EyeIcon'),

            Action::make('Edit', fn (Service $service, Url $url) => $url
                ->route('services.edit', $service)
            )
                ->dataAttributes(['edit', 'navigate' => true])
                ->icon('PencilIcon'),

            Action::make('Delete', handle: fn (Service $service) => $service->delete())
                ->confirm(
                    title: 'Delete Service',
                    message: 'Are you sure you want to delete this service?',
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
        return Service::with(['participant', 'agency'])
            ->withCount(['caregivers']);
    }
}
