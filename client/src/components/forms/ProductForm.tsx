"use client";
"use no memo";

import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect } from "react";
import { Control, useWatch } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ProductCard from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetCategories } from "@/hooks/category";
import type { Product } from "@/models/product";

const productSchema = z.object({
    name: z.string().trim().min(1, "Product name is required"),
    categoryId: z.number().min(1, "Please select a category"),
    price: z.coerce.number().min(0.01, "Price must be greater than 0"),
    imageUrl: z.string().trim().min(1, "Image URL/path is required"),
    description: z.string().trim().min(1, "Description is required"),
    stock: z.coerce.number().min(0, "Stock must be positive"),
    featured: z.boolean(),
    //optionGroups: z.array(z.string()),
});

type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormValues = z.infer<typeof productSchema>;

export type ProductFormInitialData = Partial<ProductFormValues>;

type ProductFormProps = {
    formId: string;
    productId: number;
    initialData: ProductFormValues;
    onUploadOpenChange?: (open: boolean) => void;
    onSubmit: (values: ProductFormValues) => void | Promise<void>;
};

export default function ProductForm({
    formId,
    productId,
    initialData,
    onUploadOpenChange,
    onSubmit,
}: ProductFormProps) {
    const form = useForm<ProductFormInput, undefined, ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: (initialData?.name ?? "") as string,
            categoryId: (initialData?.categoryId ?? 0) as number,
            price: (initialData?.price ?? 0) as number,
            imageUrl: (initialData?.imageUrl ?? "") as string,
            description: (initialData?.description ?? "") as string,
            stock: (initialData?.stock ?? 0) as number,
            featured: (initialData?.featured ?? false) as boolean,
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                name: initialData.name ?? "",
                categoryId: initialData.categoryId ?? 0,
                price: initialData.price ?? 0,
                imageUrl: initialData.imageUrl ?? "",
                description: initialData.description ?? "",
                //optionGroups: initialData.optionGroups ?? [],
            });
        }
    }, [initialData, form]);

    console.log(productId);

    const { data: categories = [] } = useGetCategories();
    const handleSubmit = async (values: ProductFormValues) => {
        await onSubmit(values);
    };

    return (
        <Form {...form}>
            <form
                id={formId}
                onSubmit={form.handleSubmit(handleSubmit)}
                className="grid grid-cols-1 lg:grid-cols-[70%_minmax(0,30%)] gap-6 w-full min-w-0"
            >
                <div className="space-y-6">
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Original Hot Coffee"
                                            {...field}
                                            className="h-12 rounded-xl"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start mt-4">
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel className="font-bold tracking-wide uppercase text-xs text-slate-500">
                                        Category
                                    </FormLabel>
                                    <Select
                                        value={field.value?.toString()}
                                        onValueChange={(value) =>
                                            field.onChange(Number(value))
                                        }
                                    >
                                        <FormControl>
                                            <SelectTrigger className="h-11 rounded-xl">
                                                <SelectValue placeholder="— Select Category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.categoryId}
                                                    value={category.categoryId.toString()}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription className="text-xs italic text-muted-foreground/70 mt-1">
                                        Affects which category-level rules
                                        apply.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Column 3: Featured Checkbox Card Box */}
                        <FormField
                            control={form.control}
                            name="featured"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel className="font-bold tracking-wide uppercase text-xs text-slate-500">
                                        Featured
                                    </FormLabel>
                                    <FormControl>
                                        <div className="lex w-full h-12 rounded-xl border-2 border-input bg-background px-3 py-2 text-sm font-medium placeholder:text-muted-foreground shadow-sm transition-colors duration-150 outline-none focus:border-primary focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium flex">
                                            <div className="flex items-center gap-3">
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    className="size-5 rounded-full data-[state=checked]:bg-[#d61c94] data-[state=checked]:border-[#d61c94]"
                                                />

                                                <span className="text-sm font-bold text-slate-700">
                                                    Set Featured
                                                </span>
                                            </div>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Column 4: Cloudinary Image Upload Widget */}
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({}) => (
                                <FormItem className="h-11">
                                    <FormControl>
                                        <CldUploadWidget
                                            uploadPreset="ecommerce"
                                            onSuccess={(result) => {
                                                if (
                                                    result.info &&
                                                    typeof result.info !==
                                                        "string"
                                                ) {
                                                    console.log(
                                                        result.info.public_id
                                                    );
                                                    form.setValue(
                                                        "imageUrl",
                                                        result.info.public_id,
                                                        { shouldValidate: true }
                                                    );
                                                }
                                            }}
                                            onClose={() => {
                                                onUploadOpenChange?.(false);
                                            }}
                                            onError={() => {
                                                onUploadOpenChange?.(false);
                                            }}
                                        >
                                            {({ isLoading, open }) => (
                                                <>
                                                    <FormLabel className="font-bold tracking-wide uppercase text-xs text-slate-500">
                                                        Image
                                                    </FormLabel>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        disabled={isLoading}
                                                        className="lex w-full h-12 rounded-xl border-2 border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground shadow-sm transition-colors duration-150 outline-none focus:border-primary focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium font-bold"
                                                        onClick={() => {
                                                            onUploadOpenChange?.(
                                                                true
                                                            );
                                                            open();
                                                        }}
                                                    >
                                                        {isLoading
                                                            ? "Loading..."
                                                            : "Upload"}
                                                    </Button>
                                                </>
                                            )}
                                        </CldUploadWidget>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start mt-4">
                        {/* Column 1: Price Input */}
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="md:col-span-1">
                                    <FormLabel className="font-bold tracking-wide uppercase text-xs text-slate-500">
                                        Price ($)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="89.99"
                                            name={field.name}
                                            onBlur={field.onBlur}
                                            ref={field.ref}
                                            disabled={field.disabled}
                                            value={
                                                (field.value as
                                                    | number
                                                    | string
                                                    | undefined) ?? ""
                                            }
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.valueAsNumber || 0
                                                )
                                            }
                                            className="h-11 rounded-xl"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem className="md:col-span-1">
                                    <FormLabel className="font-bold tracking-wide uppercase text-xs text-slate-500">
                                        Stock Quantity
                                    </FormLabel>
                                    <FormControl>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="120"
                                                name={field.name}
                                                onBlur={field.onBlur}
                                                ref={field.ref}
                                                disabled={field.disabled}
                                                value={
                                                    (field.value as
                                                        | number
                                                        | string
                                                        | undefined) ?? ""
                                                }
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target
                                                            .valueAsNumber || 0
                                                    )
                                                }
                                                className="h-11 rounded-xl"
                                            />
                                        </FormControl>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Columns 3 & 4: Kept intentionally empty to maintain a clean layout grid balance */}
                        <div className="hidden md:block md:col-span-2" />
                    </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Smooth, classic Dunk' coffee — the one that started it all."
                                        rows={4}
                                        {...field}
                                        className="min-h-24 rounded-xl resize-none"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/*<div className="rounded-2xl border bg-background p-5">
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    Attached Option Groups
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Pick which groups appear on this product.
                                </p>
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="optionGroups"
                            render={() => (
                                <FormItem>
                                    <div className="grid gap-3 md:grid-cols-2">
                                        {AVAILABLE_OPTION_GROUPS.map(
                                            (group) => (
                                                <FormField
                                                    key={group.id}
                                                    control={form.control}
                                                    name="optionGroups"
                                                    render={({ field }) => {
                                                        const checked =
                                                            field.value?.includes(
                                                                group.id
                                                            ) ?? false;

                                                        return (
                                                            <FormItem
                                                                key={group.id}
                                                                className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border p-4"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={
                                                                            checked
                                                                        }
                                                                        onCheckedChange={(
                                                                            value
                                                                        ) => {
                                                                            const next =
                                                                                value
                                                                                    ? [
                                                                                          ...(field.value ??
                                                                                              []),
                                                                                          group.id,
                                                                                      ]
                                                                                    : (
                                                                                          field.value ??
                                                                                          []
                                                                                      ).filter(
                                                                                          (
                                                                                              id
                                                                                          ) =>
                                                                                              id !==
                                                                                              group.id
                                                                                      );

                                                                            field.onChange(
                                                                                next
                                                                            );
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <div className="space-y-1 leading-none">
                                                                    <FormLabel className="text-sm font-medium">
                                                                        {
                                                                            group.label
                                                                        }
                                                                    </FormLabel>
                                                                </div>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>*/}
                </div>

                <div className="lg:sticky lg:top-6 w-full min-w-0">
                    <ProductPreview
                        control={form.control}
                        productId={productId ?? 0}
                    />
                </div>
            </form>
        </Form>
    );
}

function ProductPreview({
    control,
    productId,
}: {
    control: Control<ProductFormInput, undefined, ProductFormValues>;
    productId: number;
}) {
    const product = useWatch({ control });

    const previewProduct: Product = {
        productId: productId ?? 0,
        name: product.name ?? "",
        categoryId: product.categoryId ?? 0,
        price: (product.price ?? 0) as number,
        imageUrl: product.imageUrl ?? "",
        description: product.description ?? "",
        stock: (product.stock ?? 0) as number,
        featured: product.featured ?? false,
        subCategory: "",
    };

    return <ProductCard product={previewProduct} />;
}
