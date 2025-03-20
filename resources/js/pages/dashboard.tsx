import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border overflow-hidden rounded-xl border">
                        <Card className="@container/card">
                            <CardHeader className="relative">
                                <CardDescription>Total Gross Selling</CardDescription>
                                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                                    ₹1,250.00
                                </CardTitle>
                                <div className="absolute right-4 top-4">
                                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                        <TrendingUpIcon className="size-3 text-green-500" />
                                        +12.5%
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Trending up this month <TrendingUpIcon className="size-4 text-green-500" />
                                </div>
                                <div className="text-muted-foreground">
                                    Visitors for the last 6 months
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border overflow-hidden rounded-xl border">
                        <Card className="@container/card">
                            <CardHeader className="relative">
                                <CardDescription>Customers</CardDescription>
                                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                                    1,234
                                </CardTitle>
                                <div className="absolute right-4 top-4">
                                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                        <TrendingDownIcon className="size-3 text-red-500" />
                                        -20%
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Down 20% this period <TrendingDownIcon className="size-4 text-red-500" />
                                </div>
                                <div className="text-muted-foreground">
                                    Acquisition needs attention
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border overflow-hidden rounded-xl border">
                        <Card className="@container/card">
                            <CardHeader className="relative">
                                <CardDescription>Pending Payments</CardDescription>
                                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                                    ₹45,678
                                </CardTitle>
                                <div className="absolute right-4 top-4">
                                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                        <TrendingUpIcon className="size-3 text-green-500" />
                                        +12.5%
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Strong user retention <TrendingUpIcon className="size-4 text-green-500" />
                                </div>
                                <div className="text-muted-foreground">Engagement exceed targets</div>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border overflow-hidden rounded-xl border">
                        <Card className="@container/card">
                            <CardHeader className="relative">
                                <CardDescription>Total Invoices Raised</CardDescription>
                                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                                    10
                                </CardTitle>
                                <div className="absolute right-4 top-4">
                                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                        <TrendingUpIcon className="size-3 text-green-500" />
                                        +4.5%
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Steady performance <TrendingUpIcon className="size-4 text-green-500" />
                                </div>
                                <div className="text-muted-foreground">Meets growth projections</div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
