"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCategory, useUpdateCategoryFull } from "@/hooks/category";
import { Category } from "@/models/category";

const categorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Category name must be at least 2 characters."),
    description: z.string().trim().default(""),
});

type CategoryFormInput = z.input<typeof categorySchema>;
type CategoryFormValues = z.output<typeof categorySchema>;

type CategoryFormProps = {
    category: Category | null;
    onSubmit?: () => void;
};

export default function CategoryForm({
    category,
    onSubmit,
}: CategoryFormProps) {
    const form = useForm<CategoryFormInput, undefined, CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: category?.name ?? "",
            description: category?.description ?? "",
        },
    });

    const { mutate: createCategory } = useCreateCategory();

    const { mutate: updateCategory } = useUpdateCategoryFull(
        category?.categoryId ?? 0
    );

    const handleSubmit = async (values: CategoryFormValues) => {
        try {
            if (category && category.categoryId) {
                updateCategory(values, {
                    onSuccess: () => {
                        form.reset();
                        onSubmit?.();
                    },
                });
            } else {
                createCategory(values, {
                    onSuccess: () => {
                        form.reset();
                        onSubmit?.();
                    },
                });
            }
            form.reset();
        } catch (error) {
            console.error("Category submit failed:", error);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Category Name
                            </FormLabel>
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
                            <FormLabel>
                                Description
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="A short description for this category"
                                    rows={3}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                >
                    {category?.categoryId ? "Update" : "Add"} Category
                </Button>
            </form>
        </Form>
    );
}
