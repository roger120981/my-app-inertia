import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Agency {
    id: string;
    name: string;
}

interface Participant {
    id: string;
    name: string;
    email: string;
}

interface CaseManager {
    id: string;
    name: string;
    email: string;
    phone: string;
    created_at: string;
    agency: Agency;
    participants: Participant[];
}

interface CaseManagersShowProps {
    caseManager: CaseManager;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Case Managers',
        href: '/case-managers',
    },
    {
        title: 'View',
        href: '#',
    },
];

export default function CaseManagersShow({ caseManager }: CaseManagersShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={caseManager.name} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <Heading title={caseManager.name} />
                    <div className="flex space-x-2">
                        <Link
                            href={`/case-managers/${caseManager.id}/edit`}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                        >
                            Edit
                        </Link>
                        <Link
                            href="/case-managers"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                        >
                            Back to Case Managers
                        </Link>
                    </div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Case Manager Details */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                        <h3 className="text-lg font-semibold mb-4">Case Manager Details</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Full Name
                                </label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    {caseManager.name}
                                </p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    <a href={`mailto:${caseManager.email}`} className="text-blue-600 hover:text-blue-800">
                                        {caseManager.email}
                                    </a>
                                </p>
                            </div>
                            
                            {caseManager.phone && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Phone
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                        <a href={`tel:${caseManager.phone}`} className="text-blue-600 hover:text-blue-800">
                                            {caseManager.phone}
                                        </a>
                                    </p>
                                </div>
                            )}
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Agency
                                </label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    {caseManager.agency.name}
                                </p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Created
                                </label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    {new Date(caseManager.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Participants */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Participants ({caseManager.participants.length})
                        </h3>
                        {caseManager.participants.length > 0 ? (
                            <div className="space-y-3">
                                {caseManager.participants.map((participant) => (
                                    <div key={participant.id} className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
                                        <div className="font-medium text-gray-900 dark:text-gray-100">
                                            {participant.name}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {participant.email}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                No participants assigned to this case manager yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
