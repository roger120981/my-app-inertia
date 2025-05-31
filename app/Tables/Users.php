<?php

namespace App\Tables;

use App\Models\User;
use InertiaUI\Table\Action;
use InertiaUI\Table\Columns;
use InertiaUI\Table\Export;
use InertiaUI\Table\Filters;
use InertiaUI\Table\Table;
use InertiaUI\Table\Url;

class Users extends Table
{
    protected ?string $resource = User::class;

    protected ?string $defaultSort = 'name';

    protected array|string $search = ['name', 'email'];

    public function columns(): array
    {
        return [
            Columns\TextColumn::make('name', 'Full Name', sortable: true),
            Columns\TextColumn::make('email', sortable: true),
            Columns\DateColumn::make('email_verified_at', 'Email Verified'),
            Columns\DateColumn::make('created_at', 'Created', sortable: true),
            Columns\ActionColumn::new(),
        ];
    }

    public function filters(): array
    {
        return [
            Filters\TextFilter::make('name', 'Full Name'),
            Filters\TextFilter::make('email'),
            Filters\DateFilter::make('email_verified_at')->nullable(),
            Filters\DateFilter::make('created_at')->nullable(),
        ];
    }

    public function actions(): array
    {
        return [
            Action::make('View', fn (User $user, Url $url) => $url
                ->route('users.show', $user)
            )
                ->dataAttributes(['view', 'navigate' => true])
                ->icon('EyeIcon'),

            Action::make('Edit', fn (User $user, Url $url) => $url
                ->route('users.edit', $user)
            )
                ->dataAttributes(['edit', 'navigate' => true])
                ->icon('PencilIcon'),

            Action::make('Delete', handle: fn (User $user) => $user->delete())
                ->confirm(
                    title: 'Delete User',
                    message: 'Are you sure you want to delete this user?',
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
}
