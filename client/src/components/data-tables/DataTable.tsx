"use client";

import React, { useMemo, useState } from "react";

import {
    Row,
    Column,
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    useReactTable,
    SortingState,
    ColumnFiltersState,
    RowSelectionState,
    VisibilityState,
    PaginationState,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown, ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight } from "lucide-react";

import DataTableSkeleton from "@/components/skeletons/DataTableSkeleton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";

type DataTableColumnHeaderProps<TData, TValue> = {
    column: Column<TData, TValue>;
    title: string;
};
const DataTableColumnHeader = <TData, TValue>({ column, title }: DataTableColumnHeaderProps<TData, TValue>) => {
    if (!column.getCanSort() || !column.columnDef.enableSorting) {
        return <div>{title}</div>;
    }

    return (
        <div className="space-x-2" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
                <span className={column.getIsSorted() ? "text-primary" : ""}>{title}</span>
                {column.getIsSorted() === "desc" ? (
                    <ArrowDown className="text-primary" />
                ) : column.getIsSorted() === "asc" ? (
                    <ArrowUp className="text-primary" />
                ) : (
                    <ChevronsUpDown />
                )}
            </Button>
        </div>
    );
};

export const mapTableStateParam = (tableState?: TableState) => {
    return {
        ...tableState?.sorting.reduce(
            (acc, { id, desc }) => {
                acc[id] = desc ? "desc" : "asc";
                return acc;
            },
            {} as Record<string, string>
        ),
        offset: (tableState?.pagination.pageIndex ?? 0) * (tableState?.pagination.pageSize ?? 0),
        limit: tableState?.pagination.pageSize,
    };
};

type TableState = {
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
    columnVisibility: VisibilityState;
    rowSelection: RowSelectionState;
    pagination: PaginationState;
};

export const defaultTableState: TableState = {
    sorting: [],
    columnFilters: [],
    columnVisibility: {},
    rowSelection: {},
    pagination: {
        pageIndex: 0,
        pageSize: 20,
    },
};

type DataTableProps<TData> = {
    data: TData[];
    columns: ColumnDef<TData>[];
    totalCount?: number;
    isLoading: boolean;
    showCheckbox?: boolean;
    showPagination?: boolean;
    renderExpandedRow?: ({ row }: { row: Row<TData> }) => React.ReactNode;
    tableState?: TableState;
    setTableState?: React.Dispatch<React.SetStateAction<TableState>>;
    filterControls?: React.ReactNode[];
    actionControls?: React.ReactNode[];
    emptyState?: React.ReactNode;
};
const DataTable = React.forwardRef(
    <TData,>(
        {
            data,
            columns,
            totalCount,
            isLoading,
            showCheckbox = false,
            showPagination = false,
            tableState,
            setTableState,
            renderExpandedRow,
            filterControls,
            actionControls,
            emptyState,
        }: DataTableProps<TData>,
        ref?: React.Ref<HTMLTableElement>
    ) => {
        const [internalTableState, setInternalTableState] = useState<TableState>(tableState ?? defaultTableState);

        const isControlled = tableState !== undefined && setTableState !== undefined;

        const currentTableState = isControlled ? tableState : internalTableState;

        const setCurrentTableState = (updater: React.SetStateAction<TableState>) => {
            if (isControlled) {
                setTableState!(updater);
            } else {
                setInternalTableState(updater);
            }
        };

        const enhancedColumns: ColumnDef<TData>[] = useMemo(
            () =>
                showCheckbox
                    ? [
                          {
                              id: "checkbox",
                              enableSorting: false,
                              enableHiding: false,
                              header: ({ table }) => (
                                  <div className="flex justify-center items-center">
                                      <Checkbox
                                          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                                          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                                          aria-label="Select all"
                                      />
                                  </div>
                              ),
                              cell: ({ row }) => (
                                  <div className="flex justify-center items-center">
                                      <Checkbox
                                          checked={row.getIsSelected()}
                                          onCheckedChange={(value) => row.toggleSelected(!!value)}
                                          aria-label="Select row"
                                      />
                                  </div>
                              ),
                          },
                          ...columns,
                      ]
                    : columns,
            [showCheckbox, columns]
        );

        const table = useReactTable({
            data: data,
            columns: enhancedColumns,
            state: {
                sorting: currentTableState?.sorting ?? [],
                columnFilters: currentTableState?.columnFilters ?? [],
                columnVisibility: currentTableState?.columnVisibility ?? {},
                rowSelection: currentTableState?.rowSelection ?? {},
                pagination: currentTableState?.pagination ?? {
                    pageIndex: 0,
                    pageSize: 20,
                },
            },
            onSortingChange: (fn) => {
                if (typeof fn === "function") {
                    const newSorting = fn(currentTableState.sorting);
                    if (JSON.stringify(newSorting) !== JSON.stringify(currentTableState.sorting)) {
                        setCurrentTableState((prev) => ({
                            ...prev,
                            sorting: newSorting,
                        }));
                    }
                }
            },
            onColumnFiltersChange: (fn) => {
                if (typeof fn === "function") {
                    setCurrentTableState((prevState) => ({
                        ...prevState,
                        columnFilters: fn(currentTableState.columnFilters),
                    }));
                }
            },
            onColumnVisibilityChange: (fn) => {
                if (typeof fn === "function") {
                    setCurrentTableState((prevState) => ({
                        ...prevState,
                        columnVisibility: fn(currentTableState.columnVisibility),
                    }));
                }
            },
            onRowSelectionChange: (fn) => {
                if (typeof fn === "function") {
                    setCurrentTableState((prevState) => ({
                        ...prevState,
                        rowSelection: fn(currentTableState.rowSelection),
                    }));
                }
            },
            onPaginationChange: (fn) => {
                if (typeof fn === "function") {
                    setCurrentTableState((prevState) => ({
                        ...prevState,
                        pagination: fn(currentTableState.pagination),
                    }));
                }
            },
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getExpandedRowModel: getExpandedRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            getRowCanExpand: () => true,
        });

        const pageCount = Math.ceil((totalCount ?? 0) / (currentTableState?.pagination.pageSize ?? 10));

        if (isLoading) return <DataTableSkeleton numberOfColumns={columns.length} />;

        return (
            <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center flex-wrap gap-2">
                        {filterControls?.map((control, index) => (
                            <React.Fragment key={`filter-${index}`}>{control}</React.Fragment>
                        ))}
                    </div>
                    <div className="flex items-center flex-wrap gap-2">
                        {actionControls?.map((control, index) => (
                            <React.Fragment key={`action-${index}`}>{control}</React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border !overflow-y-hidden">
                    <Table ref={ref}>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id} data-column-id={header.column.id}>
                                                {header.isPlaceholder ? null : header.column.id === "checkbox" ? (
                                                    flexRender(header.column.columnDef.header, header.getContext())
                                                ) : (
                                                    <DataTableColumnHeader column={header.column} title={header.column.columnDef.header as string} />
                                                )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length
                                ? table.getRowModel().rows.map((row) => (
                                      <React.Fragment key={row.id}>
                                          <TableRow>
                                              {row.getVisibleCells().map((cell) => (
                                                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                              ))}
                                          </TableRow>
                                          {row.getIsExpanded() && (
                                              <TableRow>
                                                  <TableCell colSpan={enhancedColumns.length}>
                                                      {renderExpandedRow?.({
                                                          row,
                                                      })}
                                                  </TableCell>
                                              </TableRow>
                                          )}
                                      </React.Fragment>
                                  ))
                                : !emptyState && (
                                      <TableRow>
                                          <TableCell colSpan={columns.length} className="h-24 text-center">
                                              No results.
                                          </TableCell>
                                      </TableRow>
                                  )}
                        </TableBody>

                        {showCheckbox && showPagination && (
                            <TableFooter>
                                <TableRow className="hover:bg-transparent">
                                    <TableCell colSpan={table.getVisibleLeafColumns().length} className="p-2">
                                        <div className="flex w-full items-center justify-between gap-4">
                                            {showCheckbox && (
                                                <div className="flex-1 text-sm text-muted-foreground">
                                                    {table.getFilteredSelectedRowModel().rows.length}
                                                    {" of"} {totalCount} row(s) selected.
                                                </div>
                                            )}
                                            {showPagination && (
                                                <div className="ml-auto flex shrink-0 items-center space-x-4">
                                                    <div className="flex items-center space-x-2">
                                                        <p className="text-sm font-medium">Rows per page</p>
                                                        <Select
                                                            value={`${currentTableState?.pagination.pageSize}`}
                                                            onValueChange={(value) => {
                                                                setCurrentTableState((prev) => ({
                                                                    ...prev,
                                                                    pagination: {
                                                                        ...prev.pagination,
                                                                        pageIndex: 0,
                                                                        pageSize: Number(value),
                                                                    },
                                                                }));
                                                            }}
                                                        >
                                                            <SelectTrigger className="h-8 w-[75px]">
                                                                <SelectValue placeholder={currentTableState?.pagination.pageSize} />
                                                            </SelectTrigger>
                                                            <SelectContent side="bottom">
                                                                {[1, 10, 20, 50, 100].map((pageSize) => (
                                                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                                                        {pageSize}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            className="hidden h-8 w-8 p-0 lg:flex"
                                                            onClick={() =>
                                                                setCurrentTableState((prev) => ({
                                                                    ...prev,
                                                                    pagination: {
                                                                        ...prev.pagination,
                                                                        pageIndex: 0,
                                                                    },
                                                                }))
                                                            }
                                                            disabled={currentTableState?.pagination.pageIndex === 0}
                                                        >
                                                            <span className="sr-only">Go to first page</span>
                                                            <ChevronsLeft />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() =>
                                                                setCurrentTableState((prev) => ({
                                                                    ...prev,
                                                                    pagination: {
                                                                        ...prev.pagination,
                                                                        pageIndex: prev.pagination.pageIndex - 1,
                                                                    },
                                                                }))
                                                            }
                                                            disabled={currentTableState?.pagination.pageIndex === 0}
                                                        >
                                                            <span className="sr-only">Go to previous page</span>
                                                            <ChevronLeft />
                                                        </Button>
                                                        <div className="mx-2 flex items-center justify-center space-x-1 text-sm font-medium">
                                                            <Input
                                                                type="number"
                                                                value={(currentTableState?.pagination.pageIndex ?? 0) + 1}
                                                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-10"
                                                                onChange={(e) => {
                                                                    const page = Math.max(0, Math.min(pageCount - 1, Number(e.target.value) - 1));
                                                                    table.setPageIndex(page);
                                                                }}
                                                            />
                                                            <p>{" / "}</p>
                                                            <p>{pageCount}</p>
                                                        </div>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() =>
                                                                setCurrentTableState((prev) => ({
                                                                    ...prev,
                                                                    pagination: {
                                                                        ...prev.pagination,
                                                                        pageIndex: prev.pagination.pageIndex + 1,
                                                                    },
                                                                }))
                                                            }
                                                            disabled={!((currentTableState?.pagination.pageIndex ?? 0) + 1 < pageCount)}
                                                        >
                                                            <span className="sr-only">Go to next page</span>
                                                            <ChevronRight />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            className="hidden h-8 w-8 p-0 lg:flex"
                                                            onClick={() =>
                                                                setCurrentTableState((prev) => ({
                                                                    ...prev,
                                                                    pagination: {
                                                                        ...prev.pagination,
                                                                        pageIndex: pageCount - 1,
                                                                    },
                                                                }))
                                                            }
                                                            disabled={!((currentTableState?.pagination.pageIndex ?? 0) + 1 < pageCount)}
                                                        >
                                                            <span className="sr-only">Go to last page</span>
                                                            <ChevronsRight />
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        )}
                    </Table>
                </div>
            </div>
        );
    }
);

DataTable.displayName = "DataTable";

export default DataTable;
