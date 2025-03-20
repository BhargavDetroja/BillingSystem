"use client";

import * as React from "react";
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import FilterBar from "@/components/FilterBar";
import ConfirmationModal from "@/components/ConfirmationModal";

type Transport = {
    id: number;
    transport_id: string | null;
    name: string | null;
    address: string | null;
    mobile_number: string | null;
    gst_no: string | null;
    status: string | null;
    created_at: string;
    updated_at: string;
};

type Filters = {
    search?: string;
    status?: string;
};

type PaginatedData<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
};

interface PageProps {
    filters: Filters;
    transports: PaginatedData<Transport>;
}

export default function TransportIndex({ transports }: PageProps) {
    // const [search, setSearch] = useState<string>(filters.search || "");
    const [loading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transportIdToDelete, setTransportIdToDelete] = useState<number | null>(null);

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState({});

    // Define the handleDelete function
    const handleDelete = (id: number) => {
        setTransportIdToDelete(id);
        setIsModalOpen(true);
    };

    // Navigate to edit page
    const handleEdit = (id: number) => {
        router.visit(route("transports.edit", id));
    };

    // Confirm delete action
    const confirmDelete = () => {
        if (transportIdToDelete !== null) {
            router.delete(route("transports.destroy", transportIdToDelete), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setTransportIdToDelete(null);
                },
            });
        }
    };

    // Format status for display
    // const getStatusLabel = (status: string | null) => {
    //     if (status === "1") return "Active";
    //     if (status === "0") return "Inactive";
    //     return status;
    // };

    // Format status style
    // const getStatusStyle = (status: string | null) => {
    //     if (status === "1") return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium";
    //     if (status === "0") return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium";
    //     return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium";
    // };

    // Define columns inside the component
    const columns: ColumnDef<Transport>[] = [
        {
            accessorKey: "transport_id",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div>{row.getValue("transport_id") || "—"}</div>,
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue("name") || "—"}</div>,
        },
        {
            accessorKey: "address",
            header: "Address",
            cell: ({ row }) => (
                <div className="max-w-[200px] truncate" title={row.getValue("address")}>
                    {row.getValue("address") || "—"}
                </div>
            ),
        },
        {
            accessorKey: "mobile_number",
            header: "Mobile Number",
            cell: ({ row }) => <div>{row.getValue("mobile_number") || "—"}</div>,
        },
        {
            accessorKey: "gst_no",
            header: "GST No.",
            cell: ({ row }) => <div>{row.getValue("gst_no") || "—"}</div>,
        },
        // {
        //     accessorKey: "status",
        //     header: "Status",
        //     cell: ({ row }) => (
        //         <div className={getStatusStyle(row.getValue("status"))}>
        //             {getStatusLabel(row.getValue("status"))}
        //         </div>
        //     ),
        // },
        {
            id: "actions",
            header: "Actions",
            enableHiding: false,
            cell: ({ row }) => {
                const transport = row.original;

                return (
                    <div className="flex space-x-2">
                        {/* Edit Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(transport.id)}
                        >
                            <span className="sr-only">Edit</span>
                            <Edit className="h-5 w-5" />
                        </Button>

                        {/* Delete Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                            onClick={() => handleDelete(transport.id)}
                        >
                            <span className="sr-only">Delete</span>
                            <Trash2 className="h-5 w-5" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        data: transports.data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            rowSelection,
        },
    });

    // Handle pagination
    const handlePreviousPage = () => {
        if (transports.prev_page_url) {
            router.get(transports.prev_page_url, {}, {
                replace: true,
                preserveState: true,
            });
        }
    };

    const handleNextPage = () => {
        if (transports.next_page_url) {
            router.get(transports.next_page_url, {}, {
                replace: true,
                preserveState: true,
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Transport Providers" />
            <div className="flex justify-end m-5">
                <Link href={route("transports.create")}>
                    <Button>Add Transport</Button>
                </Link>
            </div>
            <div className="m-5">
                <FilterBar />
                <div className="rounded-md border mt-4">
                    {loading ? (
                        <div className="text-center py-4">Loading...</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
                <div className="flex items-center justify-between py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePreviousPage}
                        disabled={!transports.prev_page_url}
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Page {transports.current_page} of {transports.last_page}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={!transports.next_page_url}
                    >
                        Next
                    </Button>
                </div>
            </div>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                title="Confirm Delete"
                message="Are you sure you want to delete this transport provider?"
            />
        </AppLayout>
    );
}
