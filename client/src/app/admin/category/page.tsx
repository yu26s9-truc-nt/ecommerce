"use client";

import { useState } from "react";

import CategoryDataTable from "@/components/data-tables/CategoryDataTable";
import Dialog from "@/components/dialogs/FormDialog";
import CategoryForm, {
    CategoryFormValues,
} from "@/components/forms/CategoryForm";
import { Button } from "@/components/ui/button";
import { useCreateCategory, useUpdateCategoryFull } from "@/hooks/category";
import { Category } from "@/models/category";

export default function Page() {
    const [category, setCategory] = useState<Category | null>(null);
    const formId = "product-form";

    const { mutate: createCategory } = useCreateCategory();

    const { mutate: updateCategory } = useUpdateCategoryFull(
        category?.categoryId ?? 0
    );

    const handleFormSubmit = (values: CategoryFormValues) => {
        const options = {
            onSuccess: () => {
                setCategory(null);
            },
            onError: (error: unknown) => {
                console.error("Category submission failed:", error);
            },
        };

        if (category && category.categoryId) {
            updateCategory(values, options);
        } else {
            createCategory(values, options);
        }
    };

    return (
        <div className="space-y-4">
            <Dialog
                open={category != null}
                onOpenChange={() => setCategory(null)}
                title={`${category?.categoryId ? "Update" : "Add"} Category`}
                footer={
                    <Button type="submit" className="w-full" form={formId}>
                        {category?.categoryId ? "Update" : "Add"}
                    </Button>
                }
            >
                <CategoryForm
                    formId={formId}
                    category={category}
                    onSubmit={handleFormSubmit}
                />
            </Dialog>
            <CategoryDataTable setCategory={setCategory} />
        </div>
    );
}
