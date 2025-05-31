import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

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
    agency_id: string;
    type: string;
    weekly_hours: number | '';
    weekly_units: number | '';
    start_date: string;
    end_date: string;
    status: string;
}

interface ParticipantsCreateProps {
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
        title: 'Create',
        href: '/participants/create',
    },
];

export default function ParticipantsCreate({ caseManagers, agencies }: ParticipantsCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        medicaid_id: '',
        gender: '',
        dob: '',
        address: '',
        primary_phone: '',
        secondary_phone: '',
        community: '',
        is_active: true,
        case_manager_id: '',
    });

    const [services, setServices] = useState<Service[]>([]);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [currentService, setCurrentService] = useState<Service>({
        agency_id: '',
        type: '',
        weekly_hours: '',
        weekly_units: '',
        start_date: '',
        end_date: '',
        status: 'pending',
    });

    const handleAddService = () => {
        setShowServiceForm(true);
        setCurrentService({
            agency_id: '',
            type: '',
            weekly_hours: '',
            weekly_units: '',
            start_date: '',
            end_date: '',
            status: 'pending',
        });
    };

    const handleSaveService = () => {
        if (currentService.agency_id && currentService.type) {
            setServices([...services, currentService]);
            setShowServiceForm(false);
            setCurrentService({
                agency_id: '',
                type: '',
                weekly_hours: '',
                weekly_units: '',
                start_date: '',
                end_date: '',
                status: 'pending',
            });
        }
    };

    const handleCancelService = () => {
        setShowServiceForm(false);
        setCurrentService({
            agency_id: '',
            type: '',
            weekly_hours: '',
            weekly_units: '',
            start_date: '',
            end_date: '',
            status: 'pending',
        });
    };

    const removeService = (index: number) => {
        const newServices = services.filter((_, i) => i !== index);
        setServices(newServices);
    };

    const updateCurrentService = (field: keyof Service, value: string | number) => {
        setCurrentService({ ...currentService, [field]: value });
    };

    const getAgencyName = (agencyId: string) => {
        const agency = agencies.find(a => a.id === agencyId);
        return agency ? agency.name : 'Unknown Agency';
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Create form data with services
        const formData = new FormData();
        
        // Add participant data
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, String(value));
        });
        
        // Add services data
        services.forEach((service, index) => {
            formData.append(`services[${index}][agency_id]`, service.agency_id);
            formData.append(`services[${index}][type]`, service.type);
            if (service.weekly_hours) {
                formData.append(`services[${index}][weekly_hours]`, String(service.weekly_hours));
            }
            if (service.weekly_units) {
                formData.append(`services[${index}][weekly_units]`, String(service.weekly_units));
            }
            if (service.start_date) {
                formData.append(`services[${index}][start_date]`, service.start_date);
            }
            if (service.end_date) {
                formData.append(`services[${index}][end_date]`, service.end_date);
            }
        });
        
        post('/participants', {
            data: formData,
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Participant" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <Heading title="Create Participant" />
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

                        {/* Services Section */}
                        <div className="border-t pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Services ({services.length})</h3>
                                {!showServiceForm && (
                                    <button
                                        type="button"
                                        onClick={handleAddService}
                                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add Service
                                    </button>
                                )}
                            </div>

                            {/* Service Form */}
                            {showServiceForm && (
                                <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20 mb-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">New Service</h4>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Agency *
                                            </label>
                                            <select
                                                value={currentService.agency_id}
                                                onChange={(e) => updateCurrentService('agency_id', e.target.value)}
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
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Service Type *
                                            </label>
                                            <select
                                                value={currentService.type}
                                                onChange={(e) => updateCurrentService('type', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                required
                                            >
                                                <option value="">Select service type</option>
                                                <option value="Home Care">Home Care</option>
                                                <option value="HDM">HDM</option>
                                                <option value="ADHC">ADHC</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Weekly Hours
                                            </label>
                                            <input
                                                type="number"
                                                value={currentService.weekly_hours}
                                                onChange={(e) => updateCurrentService('weekly_hours', e.target.value ? parseInt(e.target.value) : '')}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                min="0"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Weekly Units
                                            </label>
                                            <input
                                                type="number"
                                                value={currentService.weekly_units}
                                                onChange={(e) => updateCurrentService('weekly_units', e.target.value ? parseInt(e.target.value) : '')}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                min="0"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Start Date
                                            </label>
                                            <input
                                                type="date"
                                                value={currentService.start_date}
                                                onChange={(e) => updateCurrentService('start_date', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                End Date
                                            </label>
                                            <input
                                                type="date"
                                                value={currentService.end_date}
                                                onChange={(e) => updateCurrentService('end_date', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={handleCancelService}
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSaveService}
                                            disabled={!currentService.agency_id || !currentService.type}
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Save Service
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Services List */}
                            {services.length > 0 ? (
                                <div className="space-y-3">
                                    {services.map((service, index) => (
                                        <div key={index} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex-1">
                                                            <div className="font-medium text-gray-900 dark:text-gray-100">
                                                                {getAgencyName(service.agency_id)}
                                                            </div>
                                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                                {service.type}
                                                                {service.weekly_hours && ` • ${service.weekly_hours} hours/week`}
                                                                {service.weekly_units && ` • ${service.weekly_units} units/week`}
                                                            </div>
                                                            {service.start_date && (
                                                                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                                    {new Date(service.start_date).toLocaleDateString()} - {service.end_date ? new Date(service.end_date).toLocaleDateString() : 'Ongoing'}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                                Pending
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeService(index)}
                                                                className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                                                                title="Remove service"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : !showServiceForm && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                                No Services Added
                                            </h3>
                                            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                                                <p>
                                                    Click "Add Service" to assign services from {agencies.length} available agencies. 
                                                    You can also add services later through the participant's edit page.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
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
                                {processing ? 'Creating...' : 'Create Participant'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
