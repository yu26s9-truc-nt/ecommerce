import { useEffect, useRef, useMemo } from "react";

import { Search, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useGetCategories } from "@/hooks/category";

import Form, { FormProps } from "./Form";

export const formId = "product-filter-form";

export const productsFilterSchema = z
    .object({
        search: z.string().nullable().default(null),
        categoryId: z.coerce.number().positive().nullable().default(null),
        minPrice: z.number().min(0).nullable().default(null),
        maxPrice: z.number().min(0).nullable().default(null),
    })
    .refine(
        (data) => {
            if (data.minPrice === null || data.maxPrice === null) return true;

            return data.minPrice <= data.maxPrice;
        },
        {
            message: "Minimum price cannot be greater than maximum price",
            path: ["minPrice"],
        }
    );

export type ProductsFilterFormValues = z.output<typeof productsFilterSchema>;

type ProductsFilterFormProps = FormProps<typeof productsFilterSchema>;

const ProductsFilterForm = ({ onSuccessSubmit }: ProductsFilterFormProps) => {
    const initialValues = useMemo(
        () => ({
            search: null,
            categoryId: null,
            minPrice: null,
            maxPrice: null,
        }),
        []
    );

    return (
        <Form id={formId} schema={productsFilterSchema} onSubmit={() => {}} initialValues={initialValues ?? {}}>
            {(form) => <ProductsFilterFormContent form={form} onSuccessSubmit={onSuccessSubmit} />}
        </Form>
    );
};

const ProductsFilterFormContent = ({
    form,
    onSuccessSubmit,
}: {
    form: UseFormReturn<z.input<typeof productsFilterSchema>, unknown, z.output<typeof productsFilterSchema>>;
    onSuccessSubmit?: (values: z.output<typeof productsFilterSchema>) => void;
}) => {
    const initialValues = useMemo(
        () => ({
            search: null,
            categoryId: null,
            minPrice: null,
            maxPrice: null,
        }),
        []
    );

    const { data: categories = [], isLoading: categoriesLoading } = useGetCategories();

    const lastEmittedRef = useRef("");

    const currentFilters = form.watch();

    useEffect(() => {
        const currentPayload = {
            search: currentFilters.search ?? null,
            categoryId: (currentFilters.categoryId ?? null) as number,
            minPrice: (currentFilters.minPrice ?? null) as number,
            maxPrice: (currentFilters.maxPrice ?? null) as number,
        };

        const stringified = JSON.stringify(currentPayload);

        if (lastEmittedRef.current !== stringified) {
            lastEmittedRef.current = stringified;
            onSuccessSubmit?.(currentPayload);
        }
    }, [currentFilters, onSuccessSubmit]);
    return (
        <Card className="mx-auto max-w-6xl">
            <CardContent className="flex flex-col gap-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                                <FormControl>
                                    <Input {...field} placeholder="Search coffee, donuts, drinks..." className="pl-11" value={field.value ?? ""} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/*<FormField
                                    control={form.control}
                                    name="sort"
                                    render={({ field }) => (
                                        <FormItem className="space-y-0">
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger className="h-12 w-full sm:w-64">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="popular">
                                                        <div className="flex items-center gap-2">
                                                            <Star className="size-4 fill-current" />
                                                            Most Popular
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="low-high">Price: Low → High</SelectItem>
                                                    <SelectItem value="high-low">Price: High → Low</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />*/}

                    <Button
                        type="button"
                        variant="outline"
                        className="h-9 px-4 rounded-full border-transparent bg-muted/60 text-muted-foreground hover:bg-muted font-bold text-sm"
                        onClick={() => form.reset(initialValues)}
                    >
                        <X className="mr-1 size-4" />
                        Clear
                    </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-nowrap gap-2 overflow-x-auto py-1">
                        <Button
                            size="sm"
                            variant={currentFilters.categoryId === null ? "primary" : "outline"}
                            onClick={() => form.setValue("categoryId", null)}
                        >
                            All
                        </Button>

                        {categoriesLoading ? (
                            <span className="text-sm text-muted-foreground self-center">Loading...</span>
                        ) : (
                            categories.map((category) => (
                                <Button
                                    key={category.categoryId}
                                    variant={currentFilters.categoryId === category.categoryId ? "primary" : "outline"}
                                    className="shrink-0"
                                    onClick={() => form.setValue("categoryId", category.categoryId)}
                                >
                                    {category.name}
                                </Button>
                            ))
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <FormField
                            control={form.control}
                            name="minPrice"
                            render={({ field: { value, onChange, ...rest } }) => (
                                <FormItem className="space-y-0">
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            className="w-30"
                                            {...rest}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                onChange(val === "" ? null : parseFloat(val));
                                            }}
                                            value={value === null || typeof value === "object" ? "" : (value as number)}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <span className="text-muted-foreground">–</span>

                        <FormField
                            control={form.control}
                            name="maxPrice"
                            render={({ field: { value, onChange, ...rest } }) => (
                                <FormItem className="space-y-0">
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            className="w-30"
                                            {...rest}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                onChange(val === "" ? null : parseFloat(val));
                                            }}
                                            value={value === null || typeof value === "object" ? "" : (value as number)}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductsFilterForm;
