import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

interface Participant {
    id: string;
    name: string;
    medicaid_id: string;
}

interface Agency {
    id: string;
    name: string;
}

interface ServicesCreateProps {
    participants: Participant[];
    agencies: Agency[];
}

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
        title: 'Create',
        href: '/services/create',
    },
];

export default function ServicesCreate({ participants, agencies }: ServicesCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        participant_id: '',
        agency_id: '',
        type: '',
        weekly_hours: '',
        weekly_units: '',
        start_date: '',
        end_date: '',
        status: 'pending',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/services');
    };

    const getFieldsForServiceType = (serviceType: string) => {
        switch (serviceType) {
            case 'Home Care':
            case 'ADHC':
                return { showHours: true, showUnits: true };
            case 'HDM':
                return { showHours: false, showUnits: true };
            default:
                return { showHours: true, showUnits: true };
        }
    };

    const { showHours, showUnits } = getFieldsForServiceType(data.type);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Service" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <Heading title="Create Service" />
                    <Link
                        href="/services"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                    >
                        Back to Services
                    </Link>
                </div>
                
                <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="participant_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Participant *
                                </label>
                                <select
                                    id="participant_id"
                                    value={data.participant_id}
                                    onChange={(e) => setData('participant_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="">Select a participant</option>
                                    {participants.map((participant) => (
                                        <option key={participant.id} value={participant.id}>
                                            {participant.name} ({participant.medicaid_id})
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.participant_id} className="mt-2" />
                            </div>

                            <div>
                                <label htmlFor="agency_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Agency *
                                </label>
                                <select
                                    id="agency_id"
                                    value={data.agency_id}
                                    onChange={(e) => setData('agency_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="">Select an agency</option>
                                    {agencies.map((agency) => (
                                        <option key={agency.id} value={agency.id}>
                                            {agency.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.agency_id} className="mt-2" />
                            </div>

                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Service Type *
                                </label>
                                <select
                                    id="type"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="">Select service type</option>
                                    <option value="Home Care">Home Care</option>
                                    <option value="HDM">HDM</option>
                                    <option value="ADHC">ADHC</option>
                                </select>
                                <InputError message={errors.type} className="mt-2" />
                            </div>

                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Status *
                                </label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="active">Active</option>
                                    <option value="expired">Expired</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            {showHours && (
                                <div>
                                    <label htmlFor="weekly_hours" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Weekly Hours
                                    </label>
                                    <input
                                        id="weekly_hours"
                                        type="number"
                                        value={data.weekly_hours}
                                        onChange={(e) => setData('weekly_hours', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        min="1"
                                    />
                                    <InputError message={errors.weekly_hours} className="mt-2" />
                                </div>
                            )}

                            {showUnits && (
                                <div>
                                    <label htmlFor="weekly_units" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Weekly Units
                                    </label>
                                    <input
                                        id="weekly_units"
                                        type="number"
                                        value={data.weekly_units}
                                        onChange={(e) => setData('weekly_units', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        min="1"
                                    />
                                    <InputError message={errors.weekly_units} className="mt-2" />
                                </div>
                            )}

                            <div>
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Start Date *
                                </label>
                                <input
                                    id="start_date"
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                                <InputError message={errors.start_date} className="mt-2" />
                            </div>

                            <div>
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    End Date
                                </label>
                                <input
                                    id="end_date"
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                <InputError message={errors.end_date} className="mt-2" />
                            </div>
                        </div>

                        {data.type && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                                    Service Type: {data.type}
                                </h4>
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                    {data.type === 'HDM' 
                                        ? 'HDM services only require weekly units.'
                                        : 'This service type supports both weekly hours and units.'
                                    }
                                </p>
                            </div>
                        )}

                        <div className="flex items-center justify-end space-x-4">
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                            >
                                {processing ? 'Creating...' : 'Create Service'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
