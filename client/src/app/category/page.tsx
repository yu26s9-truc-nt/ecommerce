"use client";

import { useState } from "react";

import CategoryDataTable from "@/components/data-tables/CategoryDataTable";
import CategoryDialog from "@/components/dialogs/CategoryDialog";
import { Category } from "@/models/category";

export default function Page() {
    const [category, setCategory] = useState<Category | null>(null);

    return (
        <div className="space-y-4">
            <CategoryDialog
                open={category != null}
                onOpenChange={() =>
                    setCategory(null)
                }
                category={category}
            />
            <CategoryDataTable setCategory={setCategory} />
        </div>
    );
}
