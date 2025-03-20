import React, { useState } from "react";
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash2, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import FilterBar from "@/components/FilterBar";
import ConfirmationModal from "@/components/ConfirmationModal";

type Party = {
    id: number;
    name: string | null;
    gst_no: string | null;
    address: string | null;
    mobile_number: string | null;
    email: string | null;
    state_id: number | null;
    city_id: number | null;
    pin_code: string | null;
    account_number: string | null;
    account_person_name: string | null;
    ifsc_code: string | null;
    branch_name: string | null;
    status: string | null;
    state?: {
        id: number;
        name: string;
    };
    city?: {
        id: number;
        name: string;
    };
    created_at: string;
    updated_at: string;
};

type Filters = {
    search?: string;
    status?: string;
    state_id?: number;
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
    parties: PaginatedData<Party>;
    states: Array<{ id: number; name: string }>;
}

export default function PartyIndex({ filters, parties, states }: PageProps) {
    const [search, setSearch] = useState<string>(filters.search || "");
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [partyIdToDelete, setPartyIdToDelete] = useState<number | null>(null);

    // State for view dialog
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [selectedParty, setSelectedParty] = useState<Party | null>(null);

    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState({});

    // Define the handleDelete function
    const handleDelete = (id: number) => {
        setPartyIdToDelete(id);
        setIsModalOpen(true);
    };

    // Navigate to edit page
    const handleEdit = (id: number) => {
        router.visit(route("parties.edit", id));
    };

    // Open view dialog
    const handleView = (party: Party) => {
        setSelectedParty(party);
        setViewDialogOpen(true);
    };

    // Confirm delete action
    const confirmDelete = () => {
        if (partyIdToDelete !== null) {
            router.delete(route("parties.destroy", partyIdToDelete), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setPartyIdToDelete(null);
                },
            });
        }
    };

    // Format status for display
    const getStatusLabel = (status: string | null) => {
        if (status === "1") return "Active";
        if (status === "0") return "Inactive";
        return status;
    };

    // Format status style
    const getStatusStyle = (status: string | null) => {
        if (status === "1")
            return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium";
        if (status === "0")
            return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium";
        return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium";
    };

    // Get state name by ID
    const getStateName = (stateId: number | null) => {
        if (!stateId) return "—";
        const state = states.find((s) => s.id === stateId);
        return state ? state.name : "—";
    };

    // Define columns inside the component
    const columns: ColumnDef<Party>[] = [
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
            cell: ({ row }) => (
                <div className="font-medium">{row.getValue("name") || "—"}</div>
            ),
        },
        {
            accessorKey: "mobile_number",
            header: "Mobile",
            cell: ({ row }) => <div>{row.getValue("mobile_number") || "—"}</div>,
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => <div>{row.getValue("email") || "—"}</div>,
        },
        {
            accessorKey: "gst_no",
            header: "GST No",
            cell: ({ row }) => <div>{row.getValue("gst_no") || "—"}</div>,
        },
        {
            accessorKey: "state_id",
            header: "State",
            cell: ({ row }) => (
                <div>{getStateName(row.getValue("state_id"))}</div>
            ),
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
                const party = row.original;

                return (
                    <div className="flex space-x-2">
                        {/* View Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(party)}
                        >
                            <span className="sr-only">View</span>
                            <Eye className="h-5 w-5" />
                        </Button>

                        {/* Edit Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(party.id)}
                        >
                            <span className="sr-only">Edit</span>
                            <Edit className="h-5 w-5" />
                        </Button>

                        {/* Delete Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                            onClick={() => handleDelete(party.id)}
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
        data: parties.data,
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
        if (parties.prev_page_url) {
            router.get(
                parties.prev_page_url,
                {},
                {
                    replace: true,
                    preserveState: true,
                }
            );
        }
    };

    const handleNextPage = () => {
        if (parties.next_page_url) {
            router.get(
                parties.next_page_url,
                {},
                {
                    replace: true,
                    preserveState: true,
                }
            );
        }
    };

    return (
        <AppLayout>
            <Head title="Parties" />
            <div className="flex justify-end m-5">
                <Link href={route("parties.create")}>
                    <Button>Add Party</Button>
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
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
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
                        disabled={!parties.prev_page_url}
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Page {parties.current_page} of {parties.last_page}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={!parties.next_page_url}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                title="Confirm Delete"
                message="Are you sure you want to delete this party? This action cannot be undone."
            />

            {/* View Party Dialog */}
            <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
                <DialogContent className="sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Party Details</DialogTitle>
                        <DialogDescription>
                            Complete information about the party.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedParty && (
                        <div className="grid gap-6 py-4">
                            {/* Basic Information */}
                            <div className="grid gap-4">
                                <h3 className="text-lg font-semibold">Basic Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Name</p>
                                        <p className="font-medium">{selectedParty.name || '—'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">GST Number</p>
                                        <p>{selectedParty.gst_no || '—'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Mobile Number</p>
                                        <p>{selectedParty.mobile_number || '—'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p>{selectedParty.email || '—'}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-sm text-gray-500">Address</p>
                                        <p>{selectedParty.address || '—'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">State</p>
                                        <p>{getStateName(selectedParty.state_id)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">City</p>
                                        <p>{selectedParty.city?.name || '—'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">PIN Code</p>
                                        <p>{selectedParty.pin_code || '—'}</p>
                                    </div>
                                    {/* <div>
                                        <p className="text-sm text-gray-500">Status</p>
                                        <p className={getStatusStyle(selectedParty.status)}>
                                            {getStatusLabel(selectedParty.status)}
                                        </p>
                                    </div> */}
                                </div>
                            </div>

                            {/* Bank Details */}
                            <div className="grid gap-4">
                                <h3 className="text-lg font-semibold">Bank Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Account Number</p>
                                        <p>{selectedParty.account_number || '—'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Account Holder Name</p>
                                        <p>{selectedParty.account_person_name || '—'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">IFSC Code</p>
                                        <p>{selectedParty.ifsc_code || '—'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Branch Name</p>
                                        <p>{selectedParty.branch_name || '—'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}