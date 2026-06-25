"use client";

import { Search, Star, X } from "lucide-react";
import React from "react";

import ProductCard from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetCategories } from "@/hooks/category";
import { useGetProducts } from "@/hooks/product";

type SortValue = "popular" | "low-high" | "high-low";

type Filters = {
    search: string;
    category: string;
    sort: SortValue;
    price: {
        min: number;
        max: number;
    };
};

type Props = {
    onOpenProduct?: (id: number) => void;
    onQuickAdd?: (id: number) => void;
};

const PRICE_MIN = 0;
const PRICE_MAX = 100;

const defaultFilters: Filters = {
    search: "",
    category: "all",
    sort: "popular",
    price: {
        min: PRICE_MIN,
        max: PRICE_MAX,
    },
};

export default function MenuPanel({ onOpenProduct }: Props) {
    const [filters, setFilters] = React.useState<Filters>(defaultFilters);

    const { data: categories = [], isLoading: categoriesLoading } =
        useGetCategories();

    const productParams = React.useMemo(() => {
        const params: {
            categoryId?: number;
            minPrice?: number;
            maxPrice?: number;
        } = {
            minPrice: filters.price.min,
            maxPrice: filters.price.max,
        };

        if (filters.category !== "all") {
            params.categoryId = Number(filters.category);
        }

        return params;
    }, [filters.category, filters.price.max, filters.price.min]);

    const {
        data: products = [],
        isLoading: productsLoading,
        isError,
    } = useGetProducts(productParams);

    const filteredProducts = React.useMemo(() => {
        let result = [...products];

        if (filters.search.trim()) {
            const search = filters.search.toLowerCase();

            result = result.filter((product) => {
                const name = product.name?.toLowerCase() ?? "";
                const description = product.description?.toLowerCase() ?? "";
                const subCategory = product.subCategory?.toLowerCase() ?? "";

                return (
                    name.includes(search) ||
                    description.includes(search) ||
                    subCategory.includes(search)
                );
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
            : (categories.find(
                  (category) => String(category.categoryId) === filters.category
              )?.name ?? "Category");

    const isFiltered =
        filters.search.trim() !== "" ||
        filters.category !== "all" ||
        filters.sort !== "popular" ||
        filters.price.min !== PRICE_MIN ||
        filters.price.max !== PRICE_MAX;

    const resetAll = () => setFilters(defaultFilters);

    const clampPrice = (n: number) =>
        Math.min(Math.max(n, PRICE_MIN), PRICE_MAX);

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
    };

    return (
        <>
            <section className="sticky top-[80px] z-30 border-b border-border bg-card/95 backdrop-blur">
                <div className="mx-auto max-w-6xl space-y-4 px-4 py-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={filters.search}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        search: e.target.value,
                                    }))
                                }
                                placeholder="Search the menu..."
                                className="h-12 pl-11"
                            />
                        </div>

                        <Select
                            value={filters.sort}
                            onValueChange={(value) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    sort: value as SortValue,
                                }))
                            }
                        >
                            <SelectTrigger className="h-12 w-full rounded-full sm:w-64">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="popular">
                                    <div className="flex items-center gap-2">
                                        <Star className="size-4 fill-current" />
                                        Most Popular
                                    </div>
                                </SelectItem>
                                <SelectItem value="low-high">
                                    Price: Low → High
                                </SelectItem>
                                <SelectItem value="high-low">
                                    Price: High → Low
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                        <div className="flex gap-2 overflow-x-auto py-1">
                            <Button
                                size="sm"
                                variant={
                                    filters.category === "all"
                                        ? "primary"
                                        : "outline"
                                }
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        category: "all",
                                    }))
                                }
                            >
                                All
                            </Button>

                            {categoriesLoading ? (
                                <Button size="sm" variant="outline" disabled>
                                    Loading categories...
                                </Button>
                            ) : (
                                categories.map((category) => (
                                    <Button
                                        key={category.categoryId}
                                        size="sm"
                                        variant={
                                            filters.category ===
                                            String(category.categoryId)
                                                ? "primary"
                                                : "outline"
                                        }
                                        onClick={() =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                category: String(
                                                    category.categoryId
                                                ),
                                            }))
                                        }
                                    >
                                        {category.name}
                                    </Button>
                                ))
                            )}
                        </div>

                        {isFiltered && (
                            <Button
                                size="sm"
                                variant="ghost"
                                className="shrink-0 text-muted-foreground"
                                onClick={resetAll}
                            >
                                <X className="mr-1 size-4" />
                                Reset all
                            </Button>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-card px-3 py-2">
                        <span className="text-xs font-medium text-muted-foreground">
                            Price
                        </span>

                        <div className="flex items-center gap-1.5">
                            <span className="text-sm text-muted-foreground">
                                $
                            </span>
                            <Input
                                type="number"
                                min={PRICE_MIN}
                                max={PRICE_MAX}
                                value={filters.price.min}
                                onChange={handleMinPriceChange}
                                className="h-8 w-20 px-2 text-sm"
                            />
                        </div>

                        <span className="text-muted-foreground">–</span>

                        <div className="flex items-center gap-1.5">
                            <span className="text-sm text-muted-foreground">
                                $
                            </span>
                            <Input
                                type="number"
                                min={PRICE_MIN}
                                max={PRICE_MAX}
                                value={filters.price.max}
                                onChange={handleMaxPriceChange}
                                className="h-8 w-20 px-2 text-sm"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-8">
                <h2 className="mb-4 font-display text-3xl text-dbrown">
                    {title}
                </h2>

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
                ) : filteredProducts.length === 0 ? (
                    <div className="py-16 text-center">
                        <div className="mb-3 text-6xl">🤷</div>
                        <p className="font-bold text-dbrown">
                            Nothing matched your search.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.productId}
                                onClick={() =>
                                    onOpenProduct?.(product.productId)
                                }
                                className="cursor-pointer"
                            >
                                <ProductCard
                                    product={product}
                                    isPreview={false}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}
