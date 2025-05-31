import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface User {
    id: string;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

interface UsersShowProps {
    user: User;
}

export default function UsersShow({ user }: UsersShowProps) {
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
            title: user.name,
            href: `/users/${user.id}`,
        },
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User: ${user.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <Heading title={user.name} />
                    <div className="flex items-center space-x-2">
                        <Link
                            href={`/users/${user.id}/edit`}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit User
                        </Link>
                        <Link
                            href="/users"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                        >
                            Back to Users
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* User Information */}
                    <div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                            <h3 className="text-lg font-semibold mb-4">User Information</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                                    <p className="text-gray-900 dark:text-gray-100">{user.name}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</label>
                                    <p className="text-gray-900 dark:text-gray-100">{user.email}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Verification</label>
                                    <div className="mt-1">
                                        {user.email_verified_at ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                Verified on {formatDate(user.email_verified_at)}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                Not Verified
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Created</label>
                                    <p className="text-gray-900 dark:text-gray-100">{formatDate(user.created_at)}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</label>
                                    <p className="text-gray-900 dark:text-gray-100">{formatDate(user.updated_at)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Security */}
                    <div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                            <h3 className="text-lg font-semibold mb-4">Account Security</h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Password</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Last updated {formatDate(user.updated_at)}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/users/${user.id}/edit`}
                                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3 py-1"
                                    >
                                        Change
                                    </Link>
                                </div>

                                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Email Verification</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {user.email_verified_at ? 'Email is verified' : 'Email needs verification'}
                                        </p>
                                    </div>
                                    {!user.email_verified_at && (
                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-3 py-1"
                                        >
                                            Send Verification
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Account Stats */}
                        <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6 mt-6">
                            <h3 className="text-lg font-semibold mb-4">Account Statistics</h3>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        {Math.floor((new Date().getTime() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24))}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Days Active</div>
                                </div>
                                
                                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        {user.email_verified_at ? '✓' : '✗'}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Verified</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
