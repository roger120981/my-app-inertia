<?php

namespace App\Tables;

use App\Models\User;
use InertiaUI\Table\Action;
use InertiaUI\Table\Columns;
use InertiaUI\Table\Export;
use InertiaUI\Table\Filters;
use InertiaUI\Table\Table;

class Users extends Table
{
    protected ?string $resource = User::class;

    public function columns(): array
    {
        return [
            //
        ];
    }

    public function filters(): array
    {
        return [
            //
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
            //
        ];
    }
}
