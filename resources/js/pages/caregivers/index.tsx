import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Table } from '@inertiaui/table-react';

interface CaregiversIndexProps {
    caregivers: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Caregivers',
        href: '/caregivers',
    },
];

export default function CaregiversIndex({ caregivers }: CaregiversIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Caregivers" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <Heading title="Caregivers" />
                </div>
                
                <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                    <div className="inertiaui-table-wrapper w-full">
                        <Table resource={caregivers} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
