import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Table } from '@inertiaui/table-react';

interface CaseManagersIndexProps {
    caseManagers: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Case Managers',
        href: '/case-managers',
    },
];

export default function CaseManagersIndex({ caseManagers }: CaseManagersIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Case Managers" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <Heading title="Case Managers" />
                    <button
                        onClick={() => router.visit('/case-managers/create')}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                    >
                        Add Case Manager
                    </button>
                </div>
                
                <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border bg-card p-6">
                    <div className="inertiaui-table-wrapper w-full">
                        <Table resource={caseManagers} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
