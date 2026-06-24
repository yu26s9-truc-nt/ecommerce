"use client";

import { CldImage } from "next-cloudinary";
import { Plus, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
    name: string;
    description: string;
    price: number;
    rating: number;
    image?: string | null;

    onClick?: () => void;
    onAdd?: () => void;
}

export default function ProductCard({
    name,
    description,
    price,
    rating,
    image,
    onClick,
    onAdd,
}: ProductCardProps) {
    return (
        <Card onClick={onClick} className="cursor-pointer">
            {image ? (
                <CldImage
                    src={image}
                    alt={name}
                    width={400}
                    height={400}
                    crop={{ type: "auto", source: true }}
                    className="aspect-square w-full object-cover"
                    loading="eager"
                />
            ) : (
                <div className="aspect-square w-full bg-muted" />
            )}

            <CardContent>
                <div className="flex items-start justify-between gap-2">
                    <h3 className="truncate text-lg font-bold text-foreground">
                        {name}
                    </h3>

                    <span className="flex shrink-0 items-center gap-1 text-sm font-bold text-secondary">
                        <Star className="size-4 fill-current" />
                        {rating.toFixed(1)}
                    </span>
                </div>

                <p className="mt-1 line-clamp-2 h-10 text-sm text-muted-foreground">
                    {description}
                </p>

                <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-extrabold text-primary">
                        ${price.toFixed(2)}
                    </span>

                    <Button
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAdd?.();
                        }}
                    >
                        <Plus className="size-5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
