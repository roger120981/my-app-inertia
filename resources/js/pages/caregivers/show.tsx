import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Service {
    id: string;
    type: string;
    weekly_hours: number;
    weekly_units: number;
    start_date: string;
    end_date: string;
    status: string;
    participant: {
        id: string;
        name: string;
        medicaid_id: string;
    };
    agency: {
        id: string;
        name: string;
    };
    pivot: {
        assigned_hours: number;
        assigned_at: string;
    };
}

interface Caregiver {
    id: string;
    name: string;
    email: string;
    phone: string;
    is_active: boolean;
    certifications: string[];
    available_hours: number;
    created_at: string;
    updated_at: string;
    services: Service[];
}

interface CaregiversShowProps {
    caregiver: Caregiver;
}

export default function CaregiversShow({ caregiver }: CaregiversShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Caregivers',
            href: '/caregivers',
        },
        {
            title: caregiver.name,
            href: `/caregivers/${caregiver.id}`,
        },
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'approved':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'expired':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Caregiver: ${caregiver.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <Heading title={caregiver.name} />
                    <div className="flex items-center space-x-2">
                        <Link
                            href={`/caregivers/${caregiver.id}/edit`}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Caregiver
                        </Link>
                        <Link
                            href="/caregivers"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                        >
                            Back to Caregivers
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Caregiver Information */}
                    <div className="lg:col-span-1">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                            <h3 className="text-lg font-semibold mb-4">Caregiver Information</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                                    <p className="text-gray-900 dark:text-gray-100">{caregiver.name}</p>
                                </div>

                                {caregiver.email && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                                        <p className="text-gray-900 dark:text-gray-100">{caregiver.email}</p>
                                    </div>
                                )}

                                {caregiver.phone && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
                                        <p className="text-gray-900 dark:text-gray-100">{caregiver.phone}</p>
                                    </div>
                                )}

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Available Hours</label>
                                    <p className="text-gray-900 dark:text-gray-100">{caregiver.available_hours} hours/week</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                                    <div className="mt-1">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            caregiver.is_active
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                        }`}>
                                            {caregiver.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</label>
                                    <p className="text-gray-900 dark:text-gray-100">{formatDate(caregiver.created_at)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6 mt-6">
                            <h3 className="text-lg font-semibold mb-4">Certifications</h3>
                            
                            {caregiver.certifications && caregiver.certifications.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {caregiver.certifications.map((cert, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                        >
                                            {cert}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">No certifications listed</p>
                            )}
                        </div>
                    </div>

                    {/* Services */}
                    <div className="lg:col-span-2">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Assigned Services ({caregiver.services?.length || 0})</h3>
                            </div>

                            {caregiver.services && caregiver.services.length > 0 ? (
                                <div className="space-y-4">
                                    {caregiver.services.map((service) => (
                                        <div key={service.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                                            {service.type}
                                                        </h4>
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                                                            {service.status}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <span className="text-gray-500 dark:text-gray-400">Participant:</span>
                                                            <div className="font-medium">
                                                                <Link 
                                                                    href={`/participants/${service.participant.id}`}
                                                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                                                                >
                                                                    {service.participant.name}
                                                                </Link>
                                                            </div>
                                                            <div className="text-gray-500 dark:text-gray-400 text-xs">
                                                                ID: {service.participant.medicaid_id}
                                                            </div>
                                                        </div>
                                                        
                                                        <div>
                                                            <span className="text-gray-500 dark:text-gray-400">Agency:</span>
                                                            <div className="font-medium">{service.agency.name}</div>
                                                        </div>
                                                        
                                                        <div>
                                                            <span className="text-gray-500 dark:text-gray-400">Service Period:</span>
                                                            <div className="font-medium">
                                                                {formatDate(service.start_date)} - {service.end_date ? formatDate(service.end_date) : 'Ongoing'}
                                                            </div>
                                                        </div>
                                                        
                                                        <div>
                                                            <span className="text-gray-500 dark:text-gray-400">Assigned Hours:</span>
                                                            <div className="font-medium">{service.pivot.assigned_hours} hours</div>
                                                            <div className="text-gray-500 dark:text-gray-400 text-xs">
                                                                Assigned: {formatDate(service.pivot.assigned_at)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No Services Assigned</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        This caregiver is not currently assigned to any services.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
