"use client";
import React, { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

import DataTable, { defaultTableState } from "@/components/data-tables/DataTable";
import { Button } from "@/components/ui/button";
import { useDeleteCategory, useGetCategories } from "@/hooks/category";
import { Category } from "@/models/category";

type CategoryDataTableProps = {
    setCategory: (category: Category) => void;
};

const CategoryDataTable = ({ setCategory }: CategoryDataTableProps) => {
    const [tableState, setTableState] = useState(defaultTableState);
    const { data: categories = [], isLoading: categoriesLoading } = useGetCategories();
    const { mutate: deleteCategory } = useDeleteCategory();

    const productDataTableColumn: ColumnDef<Category>[] = [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            id: "actions",
            header: "",
            enableHiding: false,
            cell: ({ row }) => (
                <div className="flex items-center gap-2 justify-end">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            setCategory(row.original);
                        }}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteCategory(row.original.categoryId)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <DataTable
            data={categories || []}
            columns={productDataTableColumn as ColumnDef<unknown>[]}
            totalCount={categories.length || 0}
            isLoading={categoriesLoading}
            tableState={tableState}
            setTableState={setTableState}
            showPagination={false}
            actionControls={[
                <Button
                    key={1}
                    onClick={() =>
                        setCategory({
                            categoryId: 0,
                            name: "",
                            description: "",
                        })
                    }
                >
                    Add
                </Button>,
            ]}
        />
    );
};

export default CategoryDataTable;
