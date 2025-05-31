import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Caregiver {
    id: string;
    name: string;
    email: string;
    phone: string;
    pivot: {
        assigned_hours: number;
        assigned_at: string;
    };
}

interface Service {
    id: string;
    type: string;
    weekly_hours: number;
    weekly_units: number;
    start_date: string;
    end_date: string;
    status: string;
    created_at: string;
    updated_at: string;
    participant: {
        id: string;
        name: string;
        medicaid_id: string;
        date_of_birth: string;
    };
    agency: {
        id: string;
        name: string;
        contact_person: string;
        phone: string;
        email: string;
    };
    caregivers: Caregiver[];
}

interface ServicesShowProps {
    service: Service;
}

export default function ServicesShow({ service }: ServicesShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Services',
            href: '/services',
        },
        {
            title: `${service.type} Service`,
            href: `/services/${service.id}`,
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
            <Head title={`Service: ${service.type}`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <Heading title={`${service.type} Service`} />
                    <div className="flex items-center space-x-2">
                        <Link
                            href={`/services/${service.id}/edit`}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Service
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                        >
                            Back to Services
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Service Information */}
                    <div className="lg:col-span-1">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                            <h3 className="text-lg font-semibold mb-4">Service Details</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Service Type</label>
                                    <p className="text-gray-900 dark:text-gray-100">{service.type}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                                    <div className="mt-1">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                                            {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                                        </span>
                                    </div>
                                </div>

                                {service.weekly_hours && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Weekly Hours</label>
                                        <p className="text-gray-900 dark:text-gray-100">{service.weekly_hours} hours</p>
                                    </div>
                                )}

                                {service.weekly_units && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Weekly Units</label>
                                        <p className="text-gray-900 dark:text-gray-100">{service.weekly_units} units</p>
                                    </div>
                                )}

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Service Period</label>
                                    <p className="text-gray-900 dark:text-gray-100">
                                        {formatDate(service.start_date)} - {service.end_date ? formatDate(service.end_date) : 'Ongoing'}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</label>
                                    <p className="text-gray-900 dark:text-gray-100">{formatDate(service.created_at)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Participant Information */}
                        <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6 mt-6">
                            <h3 className="text-lg font-semibold mb-4">Participant</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                                    <div className="font-medium">
                                        <Link 
                                            href={`/participants/${service.participant.id}`}
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                                        >
                                            {service.participant.name}
                                        </Link>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Medicaid ID</label>
                                    <p className="text-gray-900 dark:text-gray-100">{service.participant.medicaid_id}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</label>
                                    <p className="text-gray-900 dark:text-gray-100">{formatDate(service.participant.date_of_birth)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Agency Information */}
                        <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6 mt-6">
                            <h3 className="text-lg font-semibold mb-4">Agency</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Agency Name</label>
                                    <p className="text-gray-900 dark:text-gray-100">{service.agency.name}</p>
                                </div>

                                {service.agency.contact_person && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact Person</label>
                                        <p className="text-gray-900 dark:text-gray-100">{service.agency.contact_person}</p>
                                    </div>
                                )}

                                {service.agency.phone && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
                                        <p className="text-gray-900 dark:text-gray-100">{service.agency.phone}</p>
                                    </div>
                                )}

                                {service.agency.email && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                                        <p className="text-gray-900 dark:text-gray-100">{service.agency.email}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Assigned Caregivers */}
                    <div className="lg:col-span-2">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Assigned Caregivers ({service.caregivers?.length || 0})</h3>
                            </div>

                            {service.caregivers && service.caregivers.length > 0 ? (
                                <div className="space-y-4">
                                    {service.caregivers.map((caregiver) => (
                                        <div key={caregiver.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                                            <Link 
                                                                href={`/caregivers/${caregiver.id}`}
                                                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                                                            >
                                                                {caregiver.name}
                                                            </Link>
                                                        </h4>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                        {caregiver.email && (
                                                            <div>
                                                                <span className="text-gray-500 dark:text-gray-400">Email:</span>
                                                                <div className="font-medium">{caregiver.email}</div>
                                                            </div>
                                                        )}
                                                        
                                                        {caregiver.phone && (
                                                            <div>
                                                                <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                                                                <div className="font-medium">{caregiver.phone}</div>
                                                            </div>
                                                        )}
                                                        
                                                        <div>
                                                            <span className="text-gray-500 dark:text-gray-400">Assigned Hours:</span>
                                                            <div className="font-medium">{caregiver.pivot.assigned_hours} hours</div>
                                                        </div>
                                                        
                                                        <div>
                                                            <span className="text-gray-500 dark:text-gray-400">Assigned Date:</span>
                                                            <div className="font-medium">{formatDate(caregiver.pivot.assigned_at)}</div>
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No Caregivers Assigned</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        This service does not have any caregivers assigned yet.
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
