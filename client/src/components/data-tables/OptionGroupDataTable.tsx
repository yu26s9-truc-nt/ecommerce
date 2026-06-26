"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import DataTable, {
    defaultTableState,
} from "@/components/data-tables/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDeleteOptionGroup, useGetOptionGroups } from "@/hooks/option-group";
import { OptionGroup } from "@/models/option-group";

type OptionGroupDataTableProps = {
    setOptionGroup: (optionGroup: OptionGroup) => void;
};

const OptionGroupDataTable = ({
    setOptionGroup,
}: OptionGroupDataTableProps) => {
    const [tableState, setTableState] = useState(defaultTableState);
    const { data: optionGroups = [], isLoading: optionGroupsLoading } =
        useGetOptionGroups();
    const { mutate: deleteOptionGroup } = useDeleteOptionGroup();

    const optionGroupColumns: ColumnDef<OptionGroup>[] = [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "options",
            header: "Options",
            cell: ({ row }) => (
                <div className="flex max-w-[400px] flex-wrap gap-1">
                    {row.original.options?.map((option, index) => (
                        <Badge key={index} variant="secondary">
                            {option}
                        </Badge>
                    ))}
                </div>
            ),
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
                        onClick={() => setOptionGroup(row.original)}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                            deleteOptionGroup(row.original.optionGroupId)
                        }
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <DataTable
            data={optionGroups || []}
            columns={optionGroupColumns as ColumnDef<unknown>[]}
            totalCount={optionGroups.length || 0}
            isLoading={optionGroupsLoading}
            tableState={tableState}
            setTableState={setTableState}
            showPagination={false}
            actionControls={[
                <Button
                    key={1}
                    onClick={() =>
                        setOptionGroup({
                            optionGroupId: 0,
                            name: "",
                            options: [],
                        })
                    }
                >
                    Add
                </Button>,
            ]}
        />
    );
};

export default OptionGroupDataTable;
