"use client";

import React, { useState } from "react";

import ProductCard from "@/components/cards/ProductCard";
import ProductsFilterForm, { ProductsFilterFormValues } from "@/components/forms/ProductsFilterForm";
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useGetProducts } from "@/hooks/product";

type Props = {
    onOpenProduct?: (id: number) => void;
    onQuickAdd?: (id: number) => void;
};

const MenuPanel = ({ onOpenProduct }: Props) => {
    const [productsFilter, setProductsFilter] = useState<ProductsFilterFormValues>({
        search: null,
        sort: null,
        categoryId: null,
        minPrice: null,
        maxPrice: null,
    });

    const stringifiedProductsFilter = JSON.stringify(productsFilter);
    const productParams = React.useMemo(() => {
        const params: {
            search?: string;
            featured?: boolean;
            sort?: string;
            categoryId?: number;
            minPrice?: number;
            maxPrice?: number;
        } = {};

        if (productsFilter.search) {
            params.search = productsFilter.search;
        }

        if (productsFilter.categoryId !== null && productsFilter.categoryId !== undefined) {
            params.categoryId = Number(productsFilter.categoryId);
        }

        if (productsFilter.minPrice !== null) {
            params.minPrice = Number(productsFilter.minPrice);
        }

        if (productsFilter.maxPrice !== null) {
            params.maxPrice = Number(productsFilter.maxPrice);
        }

        switch (productsFilter.sort) {
            case "featured":
                params.featured = true;
                break;
            case "price,asc":
            case "price,desc":
                params.sort = productsFilter.sort;
        }

        return params;
    }, [stringifiedProductsFilter]);

    const { data: products = [], isLoading: productsLoading, isError } = useGetProducts(productParams);

    return (
        <>
            <section className="sticky top-20 z-30 border-b border-border bg-card/95 backdrop-blur p-4">
                <Card className="mx-auto max-w-280 bg-transparent">
                    <CardContent className="flex flex-col gap-3">
                        <ProductsFilterForm
                            onSuccessSubmit={(values) =>
                                setProductsFilter(
                                    values ?? {
                                        search: null,
                                        sort: null,
                                        categoryId: null,
                                        minPrice: null,
                                        maxPrice: null,
                                    }
                                )
                            }
                        />
                    </CardContent>
                </Card>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-8">
                {isError ? (
                    <div className="py-16 text-center">
                        <p className="font-bold text-dbrown">Failed to load products.</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="py-16 text-center">
                        <p className="font-bold text-dbrown">Nothing matched your search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {productsLoading
                            ? Array.from({ length: 4 }).map((_, index) => <ProductCardSkeleton key={index} />)
                            : products.map((product) => (
                                  <div key={product.productId} onClick={() => onOpenProduct?.(product.productId)} className="cursor-pointer">
                                      <ProductCard product={product} isPreview={false} />
                                  </div>
                              ))}
                    </div>
                )}
            </section>
        </>
    );
};

export default MenuPanel;
