"use client";

import {
    Column,
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Row,
    RowSelectionState,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import {
    ArrowDown,
    ArrowUp,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    ChevronsUpDown,
} from "lucide-react";
import React from "react";

import DataTableSkeleton from "@/components/skeletons/DataTableSkeleton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface DataTableColumnHeaderProps<TData, TValue> {
    column: Column<TData, TValue>;
    title: string;
}
const DataTableColumnHeader = <TData, TValue>({
    column,
    title,
}: DataTableColumnHeaderProps<TData, TValue>) => {
    if (!column.getCanSort() || !column.columnDef.enableSorting) {
        return <div>{title}</div>;
    }

    return (
        <div
            className={"space-x-2"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            <Button
                variant={"ghost"}
                size={"sm"}
                className={"-ml-3 h-8 data-[state=open]:bg-accent"}
            >
                <span>{title}</span>
                {column.getIsSorted() === "desc" ? (
                    <ArrowDown />
                ) : column.getIsSorted() === "asc" ? (
                    <ArrowUp />
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
        offset: (tableState?.pageIndex ?? 0) * (tableState?.pageSize ?? 0),
        limit: tableState?.pageSize,
    };
};

type TableState = {
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
    columnVisibility: VisibilityState;
    rowSelection: RowSelectionState;
    pageIndex: number;
    pageSize: number;
};

export const defaultTableState: TableState = {
    sorting: [],
    columnFilters: [],
    columnVisibility: {},
    rowSelection: {},
    pageIndex: 0,
    pageSize: 10,
};

export type DataTableProps<TData> = {
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
            showPagination = true,
            tableState,
            setTableState,
            renderExpandedRow,
            filterControls,
            actionControls,
            emptyState,
        }: DataTableProps<TData>,
        ref?: React.Ref<HTMLTableElement>
    ) => {
        /*const [tableState?, setTableState] = useState<TableState>({
      sorting: [],
      columnFilters: [],
      columnVisibility: {},
      rowSelection: {},
      pageIndex: 0,
      pageSize: 10,
    });

    const enhancedColumns: ColumnDef<TData>[] = showCheckbox
      ? [
          {
            id: "checkbox",
            enableSorting: false,
            enableHiding: false,
            header: ({ table }) => (
              <Checkbox
                checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                  table.toggleAllPageRowsSelected(!!value)
                }
                aria-label={"Select all"}
              />
            ),
            cell: ({ row }) => (
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label={"Select row"}
              />
            ),
          },
          ...columns,
        ]
      : columns;*/

        const table = useReactTable({
            data: data,
            columns: columns,
            state: {
                sorting: tableState?.sorting ?? [],
                columnFilters: tableState?.columnFilters ?? [],
                columnVisibility: tableState?.columnVisibility ?? {},
                rowSelection: tableState?.rowSelection ?? {},
                pagination: {
                    pageIndex: tableState?.pageIndex ?? 0,
                    pageSize: tableState?.pageSize ?? 20,
                },
            },
            onSortingChange: (fn) => {
                if (
                    typeof fn === "function" &&
                    tableState &&
                    typeof setTableState === "function"
                ) {
                    const newSorting = fn(tableState.sorting);
                    if (
                        JSON.stringify(newSorting) !==
                        JSON.stringify(tableState.sorting)
                    ) {
                        setTableState((prev) => ({
                            ...prev,
                            sorting: newSorting,
                        }));
                    }
                }
            },
            onColumnFiltersChange: (fn) => {
                if (
                    typeof fn === "function" &&
                    tableState &&
                    typeof setTableState === "function"
                ) {
                    setTableState((prevState) => ({
                        ...prevState,
                        columnFilters: fn(tableState.columnFilters),
                    }));
                }
            },
            onColumnVisibilityChange: (fn) => {
                if (
                    typeof fn === "function" &&
                    tableState &&
                    typeof setTableState === "function"
                ) {
                    setTableState((prevState) => ({
                        ...prevState,
                        columnVisibility: fn(tableState.columnVisibility),
                    }));
                }
            },
            onRowSelectionChange: (fn) => {
                if (
                    typeof fn === "function" &&
                    tableState &&
                    typeof setTableState === "function"
                ) {
                    setTableState((prevState) => ({
                        ...prevState,
                        rowSelection: fn(tableState.rowSelection),
                    }));
                }
            },
            onPaginationChange: () => {},
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getExpandedRowModel: getExpandedRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            getRowCanExpand: () => true,
        });
        const pageCount = Math.ceil(
            (totalCount ?? 0) / (tableState?.pageSize ?? 10)
        );

        return (
            <div className={"w-full flex flex-col gap-4"}>
                <div
                    className={
                        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                    }
                >
                    <div className={"flex items-center flex-wrap gap-2"}>
                        {filterControls?.map((control, index) => (
                            <React.Fragment key={`filter-${index}`}>
                                {control}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className={"flex items-center flex-wrap gap-2"}>
                        {actionControls?.map((control, index) => (
                            <React.Fragment key={`action-${index}`}>
                                {control}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                {/*showControl && (
          <div
            className={
              "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            }
          >
            <Input
              placeholder={"Search data..."}
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className={"max-w-sm"}
              disabled={true}
            />

            <div className={"flex items-center gap-2"}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className={"h-8 flex items-center"}
                  >
                    <Settings2 />
                    {"View"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={"end"} className={"w-[150px]"}>
                  <DropdownMenuLabel>{"Toggle columns"}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {table
                    .getAllColumns()
                    .filter(
                      (column) =>
                        typeof column.accessorFn !== "undefined" &&
                        column.getCanHide(),
                    )
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className={"capitalize"}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.columnDef.header as string}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant={"outline"}
                size={"sm"}
                className={"h-8 flex items-center"}
                onClick={() => {
                  if (typeof setTableState === "function")
                    setTableState(() => ({
                      sorting: [],
                      columnFilters: [],
                      columnVisibility: {},
                      rowSelection: {},
                      pageIndex: 0,
                      pageSize: 10,
                    }));
                }}
              >
                <Eraser />
                {"Clear"}
              </Button>
            </div>
          </div>
        )*/}

                {isLoading || table.getRowModel().rows?.length ? (
                    <div
                        className={
                            "border !overflow-y-hidden  rounded-xl shadow-[0_6px_18px_-10px_rgba(42,24,16,0.18)]"
                        }
                    >
                        {isLoading ? (
                            <DataTableSkeleton
                                numberOfColumns={columns.length}
                            />
                        ) : (
                            <Table ref={ref}>
                                <TableHeader>
                                    {table
                                        .getHeaderGroups()
                                        .map((headerGroup) => (
                                            <TableRow key={headerGroup.id}>
                                                {headerGroup.headers.map(
                                                    (header) => {
                                                        return (
                                                            <TableHead
                                                                key={header.id}
                                                                data-column-id={
                                                                    header
                                                                        .column
                                                                        .id
                                                                }
                                                            >
                                                                {header.isPlaceholder ? null : header
                                                                      .column
                                                                      .id ===
                                                                  "select" ? (
                                                                    flexRender(
                                                                        header
                                                                            .column
                                                                            .columnDef
                                                                            .header,
                                                                        header.getContext()
                                                                    )
                                                                ) : (
                                                                    <DataTableColumnHeader
                                                                        column={
                                                                            header.column
                                                                        }
                                                                        title={
                                                                            header
                                                                                .column
                                                                                .columnDef
                                                                                .header as string
                                                                        }
                                                                    />
                                                                )}
                                                            </TableHead>
                                                        );
                                                    }
                                                )}
                                            </TableRow>
                                        ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length
                                        ? table
                                              .getRowModel()
                                              .rows.map((row) => (
                                                  <React.Fragment key={row.id}>
                                                      <TableRow>
                                                          {row
                                                              .getVisibleCells()
                                                              .map((cell) => (
                                                                  <TableCell
                                                                      key={
                                                                          cell.id
                                                                      }
                                                                  >
                                                                      {flexRender(
                                                                          cell
                                                                              .column
                                                                              .columnDef
                                                                              .cell,
                                                                          cell.getContext()
                                                                      )}
                                                                  </TableCell>
                                                              ))}
                                                      </TableRow>
                                                      {row.getIsExpanded() && (
                                                          <TableRow
                                                          /*className={
                            "!p-0 !m-0 !border-0 !outline-none !overflow-hidden"
                          }*/
                                                          >
                                                              <TableCell
                                                                  colSpan={
                                                                      columns.length
                                                                  }
                                                                  //className={"!p-0 !m-0"}
                                                              >
                                                                  {renderExpandedRow?.(
                                                                      { row }
                                                                  )}
                                                              </TableCell>
                                                          </TableRow>
                                                      )}
                                                  </React.Fragment>
                                              ))
                                        : !emptyState && (
                                              <TableRow>
                                                  <TableCell
                                                      colSpan={columns.length}
                                                      className={
                                                          "h-24 text-center"
                                                      }
                                                  >
                                                      {"No results."}
                                                  </TableCell>
                                              </TableRow>
                                          )}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                ) : (
                    emptyState
                )}
                <div className={"flex items-center justify-between"}>
                    {showCheckbox && (
                        <div className={"flex-1 text-sm text-muted-foreground"}>
                            {table.getFilteredSelectedRowModel().rows.length}
                            {" of"} {totalCount} {"row(s) selected."}
                        </div>
                    )}
                    {showPagination && (
                        <div className={"flex items-center space-x-4 ml-auto"}>
                            <div className={"flex items-center space-x-2"}>
                                <p className={"text-sm font-medium"}>
                                    {"Rows per page"}
                                </p>
                                <Select
                                    value={`${tableState?.pageSize}`}
                                    onValueChange={(value) => {
                                        if (typeof setTableState === "function")
                                            setTableState((prev) => ({
                                                ...prev,
                                                pageIndex: 0,
                                                pageSize: Number(value),
                                            }));
                                    }}
                                >
                                    <SelectTrigger className={"h-8 w-[75px]"}>
                                        <SelectValue
                                            placeholder={tableState?.pageSize}
                                        />
                                    </SelectTrigger>
                                    <SelectContent side={"top"}>
                                        {[10, 20, 50, 100].map((pageSize) => (
                                            <SelectItem
                                                key={pageSize}
                                                value={`${pageSize}`}
                                            >
                                                {pageSize}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className={"flex items-center space-x-2"}>
                                <Button
                                    variant={"outline"}
                                    className={"hidden h-8 w-8 p-0 lg:flex"}
                                    onClick={() =>
                                        typeof setTableState === "function"
                                            ? setTableState((prev) => ({
                                                  ...prev,
                                                  pageIndex: 0,
                                              }))
                                            : {}
                                    }
                                    disabled={tableState?.pageIndex === 0}
                                >
                                    <span className={"sr-only"}>
                                        {"Go to first page"}
                                    </span>
                                    <ChevronsLeft />
                                </Button>
                                <Button
                                    variant={"outline"}
                                    className={"h-8 w-8 p-0"}
                                    onClick={() =>
                                        typeof setTableState === "function"
                                            ? setTableState((prev) => ({
                                                  ...prev,
                                                  pageIndex: prev.pageIndex - 1,
                                              }))
                                            : {}
                                    }
                                    disabled={tableState?.pageIndex === 0}
                                >
                                    <span className={"sr-only"}>
                                        {"Go to previous page"}
                                    </span>
                                    <ChevronLeft />
                                </Button>
                                <div
                                    className={
                                        "flex items-center justify-center text-sm font-medium mx-2 space-x-1"
                                    }
                                >
                                    <Input
                                        type={"number"}
                                        value={(tableState?.pageIndex ?? 0) + 1}
                                        className={"w-10 h-8"}
                                        onChange={(e) => {
                                            const page = Math.max(
                                                0,
                                                Math.min(
                                                    pageCount - 1,
                                                    Number(e.target.value) - 1
                                                )
                                            );
                                            if (
                                                typeof setTableState ===
                                                "function"
                                            ) {
                                                setTableState((prev) => ({
                                                    ...prev,
                                                    pageIndex: page,
                                                }));
                                            }
                                        }}
                                    />
                                    <p>{" / "}</p>
                                    <p>{pageCount}</p>
                                </div>
                                <Button
                                    variant={"outline"}
                                    className={"h-8 w-8 p-0"}
                                    onClick={() =>
                                        typeof setTableState === "function"
                                            ? setTableState((prev) => ({
                                                  ...prev,
                                                  pageIndex: prev.pageIndex + 1,
                                              }))
                                            : {}
                                    }
                                    disabled={
                                        !(
                                            (tableState?.pageIndex ?? 0) + 1 <
                                            pageCount
                                        )
                                    }
                                >
                                    <span className={"sr-only"}>
                                        {"Go to next page"}
                                    </span>
                                    <ChevronRight />
                                </Button>
                                <Button
                                    variant={"outline"}
                                    className={"hidden h-8 w-8 p-0 lg:flex"}
                                    onClick={() =>
                                        typeof setTableState === "function"
                                            ? setTableState((prev) => ({
                                                  ...prev,
                                                  pageIndex: pageCount - 1,
                                              }))
                                            : {}
                                    }
                                    disabled={
                                        !(
                                            (tableState?.pageIndex ?? 0) + 1 <
                                            pageCount
                                        )
                                    }
                                >
                                    <span className={"sr-only"}>
                                        {"Go to last page"}
                                    </span>
                                    <ChevronsRight />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

DataTable.displayName = "DataTable";

export default DataTable;
