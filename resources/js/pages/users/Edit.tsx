import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

interface EditUserProps {
    user: User;
}

export default function EditUser({ user }: EditUserProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Users',
            href: '/users',
        },
        {
            title: 'Edit',
            href: `/users/${user.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('users.update', user.id), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${user.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <Heading title={`Edit ${user.name}`} />
                </div>
                
                <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-foreground">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={data.name}
                                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-foreground">
                                Password (leave blank to keep current)
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-foreground">
                                Confirm Password
                            </label>
                            <input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                            >
                                {processing ? 'Updating...' : 'Update User'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
