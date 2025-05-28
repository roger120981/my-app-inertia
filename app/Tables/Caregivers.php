<?php

namespace App\Tables;

use App\Models\Caregiver;
use InertiaUI\Table\Columns;
use InertiaUI\Table\Export;
use InertiaUI\Table\Filters;
use InertiaUI\Table\Table;

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
            Columns\TextColumn::make('specialization', 'Specialization'),
            Columns\BooleanColumn::make('is_active', 'Active')
                ->trueLabel('Active')
                ->falseLabel('Inactive'),
            Columns\DateColumn::make('created_at', 'Created', sortable: true),
        ];
    }

    public function filters(): array
    {
        return [
            Filters\TextFilter::make('name', 'Full Name'),
            Filters\TextFilter::make('email'),
            Filters\TextFilter::make('phone', 'Phone Number'),
            Filters\TextFilter::make('specialization'),
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
