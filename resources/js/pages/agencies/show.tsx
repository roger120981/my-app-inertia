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
}

interface CaseManager {
    id: string;
    name: string;
    email: string;
    phone: string;
    created_at: string;
}

interface Agency {
    id: string;
    name: string;
    contact_person: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    license_number: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    services: Service[];
    caseManagers: CaseManager[];
}

interface AgenciesShowProps {
    agency: Agency;
}

export default function AgenciesShow({ agency }: AgenciesShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Agencies',
            href: '/agencies',
        },
        {
            title: agency.name,
            href: `/agencies/${agency.id}`,
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

    const formatAddress = () => {
        const parts = [agency.address, agency.city, agency.state, agency.zip_code].filter(Boolean);
        return parts.length > 0 ? parts.join(', ') : 'No address provided';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Agency: ${agency.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <Heading title={agency.name} />
                    <div className="flex items-center space-x-2">
                        <Link
                            href={`/agencies/${agency.id}/edit`}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Agency
                        </Link>
                        <Link
                            href="/agencies"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                        >
                            Back to Agencies
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Agency Information */}
                    <div className="lg:col-span-1">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                            <h3 className="text-lg font-semibold mb-4">Agency Information</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Agency Name</label>
                                    <p className="text-gray-900 dark:text-gray-100">{agency.name}</p>
                                </div>

                                {agency.contact_person && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact Person</label>
                                        <p className="text-gray-900 dark:text-gray-100">{agency.contact_person}</p>
                                    </div>
                                )}

                                {agency.phone && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
                                        <p className="text-gray-900 dark:text-gray-100">{agency.phone}</p>
                                    </div>
                                )}

                                {agency.email && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                                        <p className="text-gray-900 dark:text-gray-100">{agency.email}</p>
                                    </div>
                                )}

                                {agency.license_number && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">License Number</label>
                                        <p className="text-gray-900 dark:text-gray-100">{agency.license_number}</p>
                                    </div>
                                )}

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</label>
                                    <p className="text-gray-900 dark:text-gray-100">{formatAddress()}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                                    <div className="mt-1">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            agency.is_active
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                        }`}>
                                            {agency.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</label>
                                    <p className="text-gray-900 dark:text-gray-100">{formatDate(agency.created_at)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Case Managers */}
                        <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6 mt-6">
                            <h3 className="text-lg font-semibold mb-4">Case Managers ({agency.caseManagers?.length || 0})</h3>
                            
                            {agency.caseManagers && agency.caseManagers.length > 0 ? (
                                <div className="space-y-3">
                                    {agency.caseManagers.map((caseManager) => (
                                        <div key={caseManager.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                                            <div className="font-medium">
                                                <Link 
                                                    href={`/case-managers/${caseManager.id}`}
                                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                                                >
                                                    {caseManager.name}
                                                </Link>
                                            </div>
                                            {caseManager.email && (
                                                <div className="text-sm text-gray-600 dark:text-gray-400">{caseManager.email}</div>
                                            )}
                                            {caseManager.phone && (
                                                <div className="text-sm text-gray-600 dark:text-gray-400">{caseManager.phone}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">No case managers assigned</p>
                            )}
                        </div>
                    </div>

                    {/* Services */}
                    <div className="lg:col-span-2">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Services ({agency.services?.length || 0})</h3>
                            </div>

                            {agency.services && agency.services.length > 0 ? (
                                <div className="space-y-4">
                                    {agency.services.map((service) => (
                                        <div key={service.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                                            <Link 
                                                                href={`/services/${service.id}`}
                                                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                                                            >
                                                                {service.type}
                                                            </Link>
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
                                                            <span className="text-gray-500 dark:text-gray-400">Service Period:</span>
                                                            <div className="font-medium">
                                                                {formatDate(service.start_date)} - {service.end_date ? formatDate(service.end_date) : 'Ongoing'}
                                                            </div>
                                                        </div>
                                                        
                                                        {service.weekly_hours && (
                                                            <div>
                                                                <span className="text-gray-500 dark:text-gray-400">Weekly Hours:</span>
                                                                <div className="font-medium">{service.weekly_hours} hours</div>
                                                            </div>
                                                        )}
                                                        
                                                        {service.weekly_units && (
                                                            <div>
                                                                <span className="text-gray-500 dark:text-gray-400">Weekly Units:</span>
                                                                <div className="font-medium">{service.weekly_units} units</div>
                                                            </div>
                                                        )}
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
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No Services</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        This agency does not have any services yet.
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
