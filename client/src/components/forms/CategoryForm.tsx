import { z } from "zod";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCategory, useUpdateCategoryFull } from "@/hooks/category";

import Form, { FormProps } from "./Form";

export const formId = "category-form";

const categorySchema = z.object({
    name: z.string().trim().min(2, "Category name must be at least 2 characters."),
    description: z.string().trim().default(""),
});

type CategoryFormValues = z.output<typeof categorySchema>;

type CategoryFormProps = FormProps<typeof categorySchema> & {
    id: number | null;
};

const CategoryForm = ({ id, initialValues, onSuccessSubmit }: CategoryFormProps) => {
    const { mutate: createCategory } = useCreateCategory();
    const { mutate: updateCategory } = useUpdateCategoryFull(id ?? 0);

    const handleFormSubmit = (values: CategoryFormValues) => {
        const options = {
            onSuccess: () => {
                onSuccessSubmit?.();
            },
            onError: (error: unknown) => {
                console.error("Category submission failed:", error);
            },
        };

        if (id) {
            updateCategory(values, options);
        } else {
            createCategory(values, options);
        }
    };

    return (
        <Form id={formId} schema={categorySchema} onSubmit={handleFormSubmit} initialValues={initialValues ?? {}}>
            {(form) => (
                <>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Smoothies" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="A short description for this category" rows={3} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </>
            )}
        </Form>
    );
};

export default CategoryForm;
