"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/cards/ProductCard";

export type Product = {
    id: string;
    name: string;
    desc: string;
    price: number;
    rating: number;
    image?: string;
    emoji?: string;
    category?: string;
};

type Props = {
    items: Product[];
    filter: string;
    getCategoryName?: (key: string) => string;
    onOpenProduct?: (id: string) => void;
    onQuickAdd?: (id: string) => void;
    formatPrice?: (price: number) => string;
};

export const mockProducts: Product[] = [
    {
        id: "p1",
        name: "Classic Glazed Donut",
        desc: "Soft, fluffy donut coated with sweet vanilla glaze.",
        price: 2.5,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
        category: "donuts",
    },
    {
        id: "p2",
        name: "Chocolate Sprinkle Donut",
        desc: "Rich chocolate glaze topped with rainbow sprinkles.",
        price: 3.0,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
        category: "donuts",
    },
    {
        id: "p3",
        name: "Strawberry Filled Donut",
        desc: "Filled with sweet strawberry jam and dusted with sugar.",
        price: 3.25,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd",
        category: "donuts",
    },
    {
        id: "p4",
        name: "Matcha Latte",
        desc: "Creamy Japanese matcha with steamed milk.",
        price: 4.5,
        rating: 4.4,
        image: "iced-matcha-latte_c2qsnz",
        category: "drinks",
    },
    {
        id: "p5",
        name: "Iced Caramel Coffee",
        desc: "Bold espresso with caramel syrup and ice.",
        price: 4.25,
        rating: 4.5,
        image: "iced-matcha-latte_c2qsnz",
        category: "drinks",
    },
    {
        id: "p6",
        name: "Blueberry Muffin",
        desc: "Soft muffin packed with fresh blueberries.",
        price: 2.75,
        rating: 4.3,
        image: "iced-matcha-latte_c2qsnz",
        category: "bakery",
    },
    {
        id: "p7",
        name: "Cinnamon Roll",
        desc: "Warm cinnamon swirl topped with cream cheese icing.",
        price: 3.5,
        rating: 4.9,
        image: "iced-matcha-latte_c2qsnz",
        category: "bakery",
    },
    {
        id: "p8",
        name: "Vanilla Cupcake",
        desc: "Light vanilla sponge with buttercream frosting.",
        price: 2.25,
        rating: 4.2,
        emoji: "🧁",
        category: "cupcakes",
    },
    {
        id: "p9",
        name: "Chocolate Eclair",
        desc: "Choux pastry filled with vanilla cream and chocolate glaze.",
        price: 3.75,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1612203985729-70726954388c",
        category: "pastry",
    },
    {
        id: "p10",
        name: "Lemon Tart",
        desc: "Tangy lemon curd in a buttery crust.",
        price: 3.9,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5",
        category: "pastry",
    },
    {
        id: "p11",
        name: "Croissant",
        desc: "Buttery, flaky French croissant baked fresh daily.",
        price: 2.95,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
        category: "bakery",
    },
    {
        id: "p12",
        name: "Iced Matcha Strawberry Latte",
        desc: "Layered matcha and strawberry milk over ice.",
        price: 5.25,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1521302080334-4bebac2763a6",
        category: "drinks",
    },
];

export default function ProductsPanel({
    items,
    filter,
    getCategoryName,
    onOpenProduct,
    onQuickAdd,
    formatPrice = (p) => `$${p.toFixed(2)}`,
}: Props) {
    const title =
        filter === "all" ? "Our Menu" : (getCategoryName?.(filter) ?? filter);

    return (
        <section className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="font-display text-3xl text-dbrown mb-4">{title}</h2>

            {items.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-6xl mb-3">🤷</div>
                    <p className="font-bold text-dbrown">
                        Nothing matched your search.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map((p) => (
                        <div
                            key={p.id}
                            onClick={() => onOpenProduct?.(p.id)}
                            className="cursor-pointer"
                        >
                            <ProductCard
                                {...p}
                                price={5}
                                rating={p.rating}
                                image={p.image}
                                description={p.desc}
                            />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
