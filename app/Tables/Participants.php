<?php

namespace App\Tables;

use App\Models\Participant;
use InertiaUI\Table\Columns;
use InertiaUI\Table\Export;
use InertiaUI\Table\Filters;
use InertiaUI\Table\Table;

class Participants extends Table
{
    protected ?string $resource = Participant::class;

    protected ?string $defaultSort = 'name';

    protected array|string $search = ['name', 'email'];

    public function columns(): array
    {
        return [
            Columns\TextColumn::make('name', 'Full Name', sortable: true),
            Columns\TextColumn::make('email', sortable: true),
            Columns\TextColumn::make('phone', 'Phone Number'),
            Columns\TextColumn::make('address', 'Address'),
            Columns\DateColumn::make('created_at', 'Created', sortable: true),
        ];
    }

    public function filters(): array
    {
        return [
            Filters\TextFilter::make('name', 'Full Name'),
            Filters\TextFilter::make('email'),
            Filters\TextFilter::make('phone', 'Phone Number'),
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
