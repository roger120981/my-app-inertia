<?php

namespace App\Tables;

use App\Models\Agency;
use InertiaUI\Table\Columns;
use InertiaUI\Table\Export;
use InertiaUI\Table\Filters;
use InertiaUI\Table\Table;

class Agencies extends Table
{
    protected ?string $resource = Agency::class;

    protected ?string $defaultSort = 'name';

    protected array|string $search = ['name', 'contact_email'];

    public function columns(): array
    {
        return [
            Columns\TextColumn::make('name', 'Agency Name', sortable: true),
            Columns\TextColumn::make('contact_email', 'Contact Email', sortable: true),
            Columns\TextColumn::make('contact_phone', 'Contact Phone'),
            Columns\TextColumn::make('address', 'Address'),
            Columns\DateColumn::make('created_at', 'Created', sortable: true),
        ];
    }

    public function filters(): array
    {
        return [
            Filters\TextFilter::make('name', 'Agency Name'),
            Filters\TextFilter::make('contact_email', 'Contact Email'),
            Filters\TextFilter::make('contact_phone', 'Contact Phone'),
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
