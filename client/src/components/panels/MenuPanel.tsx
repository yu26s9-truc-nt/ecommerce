"use client";

import React, { useState } from "react";

import ProductCard from "@/components/cards/ProductCard";
import ProductsFilterForm, { ProductsFilterFormValues } from "@/components/forms/ProductsFilterForm";
import { useGetProducts } from "@/hooks/product";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
    onOpenProduct?: (id: number) => void;
    onQuickAdd?: (id: number) => void;
};

const MenuPanel = ({ onOpenProduct }: Props) => {
    const [productsFilter, setProductsFilter] = useState<ProductsFilterFormValues>({
        search: null,
        categoryId: null,
        minPrice: null,
        maxPrice: null,
    });

    const stringifiedProductsFilter = JSON.stringify(productsFilter);
    const productParams = React.useMemo(() => {
        const params: {
            search?: string;
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

        return params;
    }, [stringifiedProductsFilter]);

    const { data: products = [], isLoading: productsLoading, isError } = useGetProducts(productParams);

    /*const filteredProducts = React.useMemo(() => {
        let result = [...products];

        if (filters.search.trim()) {
            const search = filters.search.toLowerCase();

            result = result.filter((product) => {
                const name = product.name?.toLowerCase() ?? "";
                const description = product.description?.toLowerCase() ?? "";
                const subCategory = product.subCategory?.toLowerCase() ?? "";

                return name.includes(search) || description.includes(search) || subCategory.includes(search);
            });
        }

        switch (filters.sort) {
            case "low-high":
                result.sort((a, b) => Number(a.price) - Number(b.price));
                break;
            case "high-low":
                result.sort((a, b) => Number(b.price) - Number(a.price));
                break;
            case "popular":
            default:
                result.sort((a, b) => Number(b.featured) - Number(a.featured));
                break;
        }

        return result;
    }, [products, filters.search, filters.sort]);

    const title =
        filters.category === "all"
            ? "Our Menu"
            : (categories.find((category) => String(category.categoryId) === filters.category)?.name ?? "Category");

    const isFiltered =
        filters.search.trim() !== "" ||
        filters.category !== "all" ||
        filters.sort !== "popular" ||
        filters.price.min !== PRICE_MIN ||
        filters.price.max !== PRICE_MAX;

    const resetAll = () => setFilters(defaultFilters);

    const clampPrice = (n: number) => Math.min(Math.max(n, PRICE_MIN), PRICE_MAX);

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = clampPrice(Number(e.target.value || 0));
        setFilters((prev) => ({
            ...prev,
            price: { ...prev.price, min: Math.min(next, prev.price.max) },
        }));
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = clampPrice(Number(e.target.value || 0));
        setFilters((prev) => ({
            ...prev,
            price: { ...prev.price, max: Math.max(next, prev.price.min) },
        }));
    };*/

    return (
        <>
            <section className="sticky top-20 z-30 border-b border-border bg-card/95 backdrop-blur p-4">
            <Card className="mx-auto max-w-280">
            <CardContent className="flex flex-col gap-3">
                <ProductsFilterForm
                    onSuccessSubmit={(values) =>
                        setProductsFilter(
                            values ?? {
                                search: null,
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
                {/*<h2 className="mb-4 font-display text-3xl text-dbrown">{title}</h2>*/}

                {productsLoading ? (
                    <div className="py-16 text-center">
                        <p className="font-bold text-dbrown">Loading products...</p>
                    </div>
                ) : isError ? (
                    <div className="py-16 text-center">
                        <p className="font-bold text-dbrown">Failed to load products.</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="py-16 text-center">
                        <div className="mb-3 text-6xl">🤷</div>
                        <p className="font-bold text-dbrown">Nothing matched your search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {products.map((product) => (
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
