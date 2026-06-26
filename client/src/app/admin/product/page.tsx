"use client";

import { useState } from "react";

import ProductCard from "@/components/cards/ProductCard";
import Dialog from "@/components/dialogs/FormDialog";
import ProductForm, { ProductFormValues } from "@/components/forms/ProductForm";
import { Button } from "@/components/ui/button";
import { useGetProducts } from "@/hooks/product";
import { useCreateProduct, useUpdateProductFull } from "@/hooks/product";
import { Product } from "@/models/product";

const formId = "product-form";

const Page = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [cloudinaryUploadOpen, setCloudinaryUploadOpen] = useState(false);
    const handleOpenChange = (open: boolean) => {
        if (!open && !cloudinaryUploadOpen) {
            setProduct(null);
        }
    };

    const { mutate: createProduct } = useCreateProduct();

    const { mutate: updateProduct } = useUpdateProductFull(
        product?.productId ?? 0
    );

    const {
        data: products = [],
        isLoading: productsLoading,
        isError,
    } = useGetProducts();

    const handleSubmit = (values: ProductFormValues) => {
        const options = {
            onSuccess: () => {
                setProduct(null);
            },
            onError: (error: unknown) => {
                console.error("Category submission failed:", error);
            },
        };

        if (product && product.productId) {
            updateProduct(
                { subCategory: product.subCategory, ...values },
                options
            );
        } else {
            createProduct({ subCategory: "", ...values }, options);
        }
    };

    return (
        <div className="space-y-4">
            <Dialog
                modal={false}
                open={product != null}
                onOpenChange={handleOpenChange}
                contentProps={{
                    onEscapeKeyDown: (event) => {
                        if (cloudinaryUploadOpen) {
                            event.preventDefault();
                        }
                    },
                    onInteractOutside: (event) => {
                        if (cloudinaryUploadOpen) {
                            event.preventDefault();
                        }
                    },
                }}
                title={`${product?.productId ? "Update" : "Add"} Product`}
                footer={
                    <Button type="submit" className="w-full" form={formId}>
                        {product?.productId ? "Update" : "Add"}
                    </Button>
                }
                className="sm:max-w-2xl md:max-w-7xl w-full"
            >
                {product && (
                    <ProductForm
                        formId={formId}
                        productId={product.productId ?? 0}
                        initialData={{
                            name: product.name ?? "",
                            categoryId: product.categoryId ?? 0,
                            price: product.price ?? 0,
                            imageUrl: product.imageUrl ?? "",
                            description: product.description ?? "",
                            stock: product.stock ?? 0,
                            featured: product.featured ?? false,
                        }}
                        onUploadOpenChange={setCloudinaryUploadOpen}
                        onSubmit={handleSubmit}
                    />
                )}
            </Dialog>
            <Button
                className="ml-auto"
                onClick={() =>
                    setProduct({
                        productId: 0,
                        name: "",
                        categoryId: 0,
                        price: 0,
                        imageUrl: "",
                        description: "",
                        stock: 0,
                        featured: false,
                        subCategory: "",
                    })
                }
            >
                Add
            </Button>
            <section className="mx-auto max-w-6xl py-8">
                {productsLoading ? (
                    <div className="py-16 text-center">
                        <p className="font-bold text-dbrown">
                            Loading products...
                        </p>
                    </div>
                ) : isError ? (
                    <div className="py-16 text-center">
                        <p className="font-bold text-dbrown">
                            Failed to load products.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {products.map((product) => (
                            <div
                                key={product.productId}
                                onClick={() => setProduct(product)}
                                className="cursor-pointer"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Page;
