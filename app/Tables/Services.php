<?php

namespace App\Tables;

use App\Models\Service;
use InertiaUI\Table\Columns;
use InertiaUI\Table\Export;
use InertiaUI\Table\Filters;
use InertiaUI\Table\Table;

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
            Columns\NumericColumn::make('weekly_hours', 'Weekly Hours', sortable: true),
            Columns\NumericColumn::make('weekly_units', 'Weekly Units', sortable: true),
            Columns\TextColumn::make('status', 'Status', sortable: true),
            Columns\DateColumn::make('start_date', 'Start Date', sortable: true),
            Columns\DateColumn::make('end_date', 'End Date', sortable: true),
            Columns\DateColumn::make('created_at', 'Created', sortable: true),
        ];
    }

    public function filters(): array
    {
        return [
            Filters\TextFilter::make('type', 'Service Type'),
            Filters\TextFilter::make('status', 'Status'),
            Filters\NumericFilter::make('weekly_hours', 'Weekly Hours'),
            Filters\NumericFilter::make('weekly_units', 'Weekly Units'),
            Filters\DateFilter::make('start_date', 'Start Date')->nullable(),
            Filters\DateFilter::make('end_date', 'End Date')->nullable(),
            Filters\DateFilter::make('created_at')->nullable(),
        ];
    }

    public function actions(): array
    {
        return [
            //
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
}
