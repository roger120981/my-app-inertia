import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Table } from '@inertiaui/table-react';

interface AgenciesIndexProps {
    agencies: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Agencies',
        href: '/agencies',
    },
];

export default function AgenciesIndex({ agencies }: AgenciesIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Agencies" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <Heading title="Agencies" />
                </div>
                
                <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                    <div className="inertiaui-table-wrapper w-full">
                        <Table resource={agencies} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
