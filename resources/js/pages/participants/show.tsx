import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Agency {
    id: string;
    name: string;
}

interface CaseManager {
    id: string;
    name: string;
    email: string;
    agency?: Agency;
}

interface Service {
    id: string;
    name: string;
    description?: string;
}

interface Participant {
    id: string;
    name: string;
    medicaid_id: string;
    gender: string;
    dob: string;
    address: string;
    primary_phone: string;
    secondary_phone?: string;
    community?: string;
    is_active: boolean;
    created_at: string;
    caseManager: CaseManager;
    services?: Service[];
}

interface ParticipantsShowProps {
    participant: Participant;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Participants',
        href: '/participants',
    },
    {
        title: 'View',
        href: '#',
    },
];

export default function ParticipantsShow({ participant }: ParticipantsShowProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const calculateAge = (dob: string) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={participant.name} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <Heading title={participant.name} />
                    <div className="flex space-x-2">
                        <Link
                            href={`/participants/${participant.id}/edit`}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                        >
                            Edit
                        </Link>
                        <Link
                            href="/participants"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                        >
                            Back to Participants
                        </Link>
                    </div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Participant Details */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                        <h3 className="text-lg font-semibold mb-4">Participant Details</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Full Name
                                </label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    {participant.name}
                                </p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Medicaid ID
                                </label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    {participant.medicaid_id}
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Gender
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 capitalize">
                                        {participant.gender}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Age
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                        {calculateAge(participant.dob)} years old
                                    </p>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Date of Birth
                                </label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    {formatDate(participant.dob)}
                                </p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Address
                                </label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    {participant.address}
                                </p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Primary Phone
                                </label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    <a href={`tel:${participant.primary_phone}`} className="text-blue-600 hover:text-blue-800">
                                        {participant.primary_phone}
                                    </a>
                                </p>
                            </div>
                            
                            {participant.secondary_phone && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Secondary Phone
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                        <a href={`tel:${participant.secondary_phone}`} className="text-blue-600 hover:text-blue-800">
                                            {participant.secondary_phone}
                                        </a>
                                    </p>
                                </div>
                            )}
                            
                            {participant.community && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Community
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                        {participant.community}
                                    </p>
                                </div>
                            )}
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Status
                                </label>
                                <p className="mt-1 text-sm">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        participant.is_active 
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                    }`}>
                                        {participant.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Created
                                </label>
                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                    {formatDate(participant.created_at)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Case Manager */}
                        <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                            <h3 className="text-lg font-semibold mb-4">Case Manager</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Name
                                    </label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                        {participant.caseManager?.name || 'No case manager assigned'}
                                    </p>
                                </div>
                                
                                {participant.caseManager?.email && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Email
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                            <a href={`mailto:${participant.caseManager.email}`} className="text-blue-600 hover:text-blue-800">
                                                {participant.caseManager.email}
                                            </a>
                                        </p>
                                    </div>
                                )}
                                
                                {participant.caseManager?.agency?.name && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Agency
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                            {participant.caseManager.agency.name}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Services */}
                        <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                            <h3 className="text-lg font-semibold mb-4">
                                Services ({participant.services?.length || 0})
                            </h3>
                            {participant.services && participant.services.length > 0 ? (
                                <div className="space-y-3">
                                    {participant.services.map((service) => (
                                        <div key={service.id} className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
                                            <div className="font-medium text-gray-900 dark:text-gray-100">
                                                {service.name}
                                            </div>
                                            {service.description && (
                                                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                    {service.description}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                    No services assigned to this participant yet.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
