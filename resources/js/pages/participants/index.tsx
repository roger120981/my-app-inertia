import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Table } from '@inertiaui/table-react';

interface ParticipantsIndexProps {
    participants: unknown;
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
];

export default function ParticipantsIndex({ participants }: ParticipantsIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Participants" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <Heading title="Participants" />
                </div>
                
                <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                    <div className="inertiaui-table-wrapper w-full">
                        <Table resource={participants} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
