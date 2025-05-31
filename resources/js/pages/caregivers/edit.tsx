import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

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
}

interface CaregiversEditProps {
    caregiver: Caregiver;
}

export default function CaregiversEdit({ caregiver }: CaregiversEditProps) {
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
        {
            title: 'Edit',
            href: `/caregivers/${caregiver.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: caregiver.name || '',
        email: caregiver.email || '',
        phone: caregiver.phone || '',
        is_active: caregiver.is_active,
        available_hours: caregiver.available_hours || 40,
        certifications: caregiver.certifications || [],
    });

    const [certifications, setCertifications] = useState<string[]>(caregiver.certifications || []);
    const [currentCertification, setCurrentCertification] = useState('');

    const addCertification = () => {
        if (currentCertification.trim() && !certifications.includes(currentCertification.trim())) {
            const newCertifications = [...certifications, currentCertification.trim()];
            setCertifications(newCertifications);
            setData('certifications', newCertifications);
            setCurrentCertification('');
        }
    };

    const removeCertification = (index: number) => {
        const newCertifications = certifications.filter((_, i) => i !== index);
        setCertifications(newCertifications);
        setData('certifications', newCertifications);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/caregivers/${caregiver.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Caregiver: ${caregiver.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <Heading title={`Edit ${caregiver.name}`} />
                    <div className="flex items-center space-x-2">
                        <Link
                            href={`/caregivers/${caregiver.id}`}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                        >
                            View Caregiver
                        </Link>
                        <Link
                            href="/caregivers"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                        >
                            Back to Caregivers
                        </Link>
                    </div>
                </div>
                
                <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Full Name *
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
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                <InputError message={errors.phone} className="mt-2" />
                            </div>

                            <div>
                                <label htmlFor="available_hours" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Available Hours per Week *
                                </label>
                                <input
                                    id="available_hours"
                                    type="number"
                                    value={data.available_hours}
                                    onChange={(e) => setData('available_hours', parseInt(e.target.value) || 0)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    min="1"
                                    max="168"
                                    required
                                />
                                <InputError message={errors.available_hours} className="mt-2" />
                                <p className="mt-1 text-sm text-gray-500">Maximum 168 hours per week (24 hours × 7 days)</p>
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

                        {/* Certifications Section */}
                        <div className="border-t pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Certifications ({certifications.length})</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={currentCertification}
                                        onChange={(e) => setCurrentCertification(e.target.value)}
                                        placeholder="Enter certification name"
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addCertification();
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={addCertification}
                                        disabled={!currentCertification.trim()}
                                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                                    >
                                        Add
                                    </button>
                                </div>

                                {certifications.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {certifications.map((cert, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                            >
                                                {cert}
                                                <button
                                                    type="button"
                                                    onClick={() => removeCertification(index)}
                                                    className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            No certifications added yet. Add certifications like "CPR", "First Aid", "CNA", etc.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-end space-x-4">
                            <Link
                                href={`/caregivers/${caregiver.id}`}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                            >
                                {processing ? 'Updating...' : 'Update Caregiver'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
