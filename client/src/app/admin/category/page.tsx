"use client";

import { useState } from "react";

import CategoryDataTable from "@/components/data-tables/CategoryDataTable";
import Dialog from "@/components/dialogs/FormDialog";
import CategoryForm, { formId } from "@/components/forms/CategoryForm";
import { Button } from "@/components/ui/button";
import { Category } from "@/models/category";

const Page = () => {
    const [category, setCategory] = useState<Category | null>(null);

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
                    id={category?.categoryId ?? null}
                    initialValues={{
                        name: category?.name ?? "",
                        description: category?.description ?? "",
                    }}
                    onSuccessSubmit={() => setCategory(null)}
                />
            </Dialog>
            <CategoryDataTable setCategory={setCategory} />
        </div>
    );
};

export default Page;
