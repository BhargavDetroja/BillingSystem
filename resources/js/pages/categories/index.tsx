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
import { Head, Link, usePage, router } from "@inertiajs/react";
import { useState } from "react";
import FilterBar from "@/components/FilterBar"; // Import the FilterBar component
import ConfirmationModal from "@/components/ConfirmationModal"; // Import the ConfirmationModal component

type Category = {
    id: number;
    name: string;
};

export default function CategoryIndex() {
    const { props } = usePage();
    const { filters, categories } = props; // Initial filters and categories from the server

    const [search, setSearch] = useState(filters.search || ""); // State for search query
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [categoryIdToDelete, setCategoryIdToDelete] = useState<number | null>(null); // State for category ID to delete

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState({});

    // Define the handleDelete function
    const handleDelete = (id: number) => {
        setCategoryIdToDelete(id);
        setIsModalOpen(true);
    };

    // Navigate to edit page
    const handleEdit = (id: number) => {
        router.visit(route("categories.edit", id));
    };

    // Confirm delete action
    const confirmDelete = () => {
        if (categoryIdToDelete !== null) {
            router.delete(route("categories.destroy", categoryIdToDelete), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setCategoryIdToDelete(null);
                },
            });
        }
    };

    // Define columns inside the component to have access to handleDelete
    const columns: ColumnDef<Category>[] = [
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
            cell: ({ row }) => <div>{row.getValue("name")}</div>,
        },
        {
            id: "actions",
            header: "Actions",
            enableHiding: false,
            cell: ({ row }) => {
                const category = row.original;

                return (
                    <div className="flex space-x-2">
                        {/* Edit Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(category.id)}
                        >
                            <span className="sr-only">Edit</span>
                            <Edit className="h-5 w-5" /> {/* Lucide Edit Icon */}
                        </Button>

                        {/* Delete Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                            onClick={() => handleDelete(category.id)}
                        >
                            <span className="sr-only">Delete</span>
                            <Trash2 className="h-5 w-5" /> {/* Lucide Trash Icon */}
                        </Button>
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        data: categories.data, // Use the paginated data
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
        if (categories.prev_page_url) {
            router.get(categories.prev_page_url, {}, {
                replace: true,
                preserveState: true,
            });
        }
    };

    const handleNextPage = () => {
        if (categories.next_page_url) {
            router.get(categories.next_page_url, {}, {
                replace: true,
                preserveState: true,
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Categories" />
            <div className="flex justify-end m-5">
                <Link href={route("categories.create")}>
                    <Button>Create Category</Button>
                </Link>
            </div>
            <div className="m-5">
                <FilterBar /> {/* Use the FilterBar component */}
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
                        disabled={!categories.prev_page_url}
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Page {categories.current_page} of {categories.last_page}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={!categories.next_page_url}
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
                message="Are you sure you want to delete this category?"
            />
        </AppLayout>
    );
}