import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

interface CaseManager {
    id: string;
    name: string;
    agency_name: string;
    display_name: string;
}

interface Agency {
    id: string;
    name: string;
}

interface Service {
    id: string;
    agency_id: string;
    type: string;
    weekly_hours: number | null;
    weekly_units: number | null;
    start_date: string;
    end_date: string;
    status: string;
    agency?: Agency;
}

interface Participant {
    id: string;
    name: string;
    medicaid_id: string;
    gender: string;
    dob: string;
    address: string;
    primary_phone: string;
    secondary_phone: string;
    community: string;
    is_active: boolean;
    case_manager_id: string;
    services?: Service[];
}

interface ParticipantsEditProps {
    participant: Participant;
    caseManagers: CaseManager[];
    agencies: Agency[];
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
        title: 'Edit',
        href: '#',
    },
];

export default function ParticipantsEdit({ participant, caseManagers, agencies }: ParticipantsEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: participant.name,
        medicaid_id: participant.medicaid_id,
        gender: participant.gender,
        dob: participant.dob.split('T')[0], // Fix date format for input[type="date"]
        address: participant.address,
        primary_phone: participant.primary_phone,
        secondary_phone: participant.secondary_phone || '',
        community: participant.community || '',
        is_active: participant.is_active,
        case_manager_id: participant.case_manager_id,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/participants/${participant.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${participant.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <Heading title={`Edit ${participant.name}`} />
                    <Link
                        href="/participants"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                    >
                        Back to Participants
                    </Link>
                </div>
                
                <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <label htmlFor="medicaid_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Medicaid ID
                                </label>
                                <input
                                    id="medicaid_id"
                                    type="text"
                                    value={data.medicaid_id}
                                    onChange={(e) => setData('medicaid_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                                <InputError message={errors.medicaid_id} className="mt-2" />
                            </div>

                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Gender
                                </label>
                                <select
                                    id="gender"
                                    value={data.gender}
                                    onChange={(e) => setData('gender', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <InputError message={errors.gender} className="mt-2" />
                            </div>

                            <div>
                                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Date of Birth
                                </label>
                                <input
                                    id="dob"
                                    type="date"
                                    value={data.dob}
                                    onChange={(e) => setData('dob', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                                <InputError message={errors.dob} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Address
                            </label>
                            <textarea
                                id="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                required
                            />
                            <InputError message={errors.address} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="primary_phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Primary Phone
                                </label>
                                <input
                                    id="primary_phone"
                                    type="tel"
                                    value={data.primary_phone}
                                    onChange={(e) => setData('primary_phone', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                                <InputError message={errors.primary_phone} className="mt-2" />
                            </div>

                            <div>
                                <label htmlFor="secondary_phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Secondary Phone
                                </label>
                                <input
                                    id="secondary_phone"
                                    type="tel"
                                    value={data.secondary_phone}
                                    onChange={(e) => setData('secondary_phone', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                <InputError message={errors.secondary_phone} className="mt-2" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="community" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Community
                                </label>
                                <input
                                    id="community"
                                    type="text"
                                    value={data.community}
                                    onChange={(e) => setData('community', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                <InputError message={errors.community} className="mt-2" />
                            </div>

                            <div>
                                <label htmlFor="case_manager_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Case Manager
                                </label>
                                <select
                                    id="case_manager_id"
                                    value={data.case_manager_id}
                                    onChange={(e) => setData('case_manager_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="">Select a case manager</option>
                                    {caseManagers.map((caseManager) => (
                                        <option key={caseManager.id} value={caseManager.id}>
                                            {caseManager.display_name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.case_manager_id} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked === true)}
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</span>
                            </label>
                            <InputError message={errors.is_active} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end space-x-4">
                            <Link
                                href="/participants"
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                            >
                                {processing ? 'Updating...' : 'Update Participant'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Services Section */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">Services ({participant.services?.length || 0})</h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {agencies.length} agencies available
                        </div>
                    </div>
                    
                    {participant.services && participant.services.length > 0 ? (
                        <div className="space-y-4">
                            {participant.services.map((service) => (
                                <div key={service.id} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Agency
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                                {service.agency?.name || 'Unknown Agency'}
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Service Type
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                                {service.type}
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Status
                                            </label>
                                            <p className="mt-1 text-sm">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    service.status === 'active' 
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        : service.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                                }`}>
                                                    {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                                        {service.weekly_hours && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Weekly Hours
                                                </label>
                                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                                    {service.weekly_hours}
                                                </p>
                                            </div>
                                        )}
                                        
                                        {service.weekly_units && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Weekly Units
                                                </label>
                                                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                                    {service.weekly_units}
                                                </p>
                                            </div>
                                        )}
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Start Date
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                                {new Date(service.start_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                End Date
                                            </label>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                                                {new Date(service.end_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No services</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                This participant doesn't have any services assigned yet.
                            </p>
                            <div className="mt-6">
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                                Services Management
                                            </h3>
                                            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                                                <p>
                                                    Services can be managed through the Services section of the application. 
                                                    You can assign services from {agencies.length} available agencies.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
