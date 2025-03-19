import * as React from 'react'
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage  } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
];

/** react datatable  */


type Person = {
    id: number;
    name: string;
};

const columnHelper = createColumnHelper<Person>();

const columns = [
    columnHelper.accessor('id', {
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('name', {
        cell: (info) => info.getValue(),
    }),
];


export default function CategoryIndex() {
    const { props } = usePage();
    const { categories } = props;

    const [data] = React.useState(() => [...categories]);
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex justify-end mt-2">
                <Link href={route('categories.create')} > Create Category</Link>
                <Button >Cancel</Button>
            </div>
            <div className="flex flex-col h-screen max-w-3xl mx-auto py-24">
                <table className="border">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr
                                key={headerGroup.id}
                                className="border-b text-gray-800 uppercase"
                            >
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-4 pr-2 py-4 font-medium text-left"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className: header.column.getCanSort()
                                                        ? 'cursor-pointer select-none flex min-w-[36px]'
                                                        : '',
                                                    onClick: header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: <span className="pl-2">↑</span>,
                                                    desc: <span className="pl-2">↓</span>,
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="border-b">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-4 pt-[14px] pb-[18px]">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex sm:flex-row flex-col w-full mt-8 items-center gap-2 text-xs">
                    <div className="sm:mr-auto sm:mb-0 mb-2">
                        <span className="mr-2">Items per page</span>
                        <select
                            className="border p-1 rounded w-16 border-gray-200"
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => {
                                table.setPageSize(Number(e.target.value));
                            }}
                        >
                            {[5, 10, 15, 20].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button
                            className={`${!table.getCanPreviousPage()
                                ? 'bg-gray-100'
                                : 'hover:bg-gray-200 hover:curstor-pointer bg-gray-100'
                                } rounded p-1`}
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="w-5 h-5">{'<<'}</span>
                        </button>
                        <button
                            className={`${!table.getCanPreviousPage()
                                ? 'bg-gray-100'
                                : 'hover:bg-gray-200 hover:curstor-pointer bg-gray-100'
                                } rounded p-1`}
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="w-5 h-5">{'<'}</span>
                        </button>
                        <span className="flex items-center gap-1">
                            <input
                                min={1}
                                max={table.getPageCount()}
                                type="number"
                                value={table.getState().pagination.pageIndex + 1}
                                onChange={(e) => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                    table.setPageIndex(page);
                                }}
                                className="border p-1 rounded w-10"
                            />
                            de {table.getPageCount()}
                        </span>
                        <button
                            className={`${!table.getCanNextPage()
                                ? 'bg-gray-100'
                                : 'hover:bg-gray-200 hover:curstor-pointer bg-gray-100'
                                } rounded p-1`}
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="w-5 h-5">{'>'}</span>
                        </button>
                        <button
                            className={`${!table.getCanNextPage()
                                ? 'bg-gray-100'
                                : 'hover:bg-gray-200 hover:curstor-pointer bg-gray-100'
                                } rounded p-1`}
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="w-5 h-5">{'>>'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
