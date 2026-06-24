"use client";

import { Award, Plus } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAddCartItem } from "@/hooks/cart";
import type { Product } from "@/models/product";
import type { RootState } from "@/store/store";

interface ProductCardProps extends Product {
    rating: number;
}

export default function ProductCard({
    productId,
    name,
    description,
    price,
    featured,
    imageUrl,
}: ProductCardProps) {
    const addCartMutation = useAddCartItem();

    const handleAddToCart = () => {
        addCartMutation.mutate(productId);
    };

    const { isAuthenticated } = useSelector(
        (state: RootState) => state.authReducer
    );

    return (
        <Card className="cursor-pointer">
            <div className="relative">
                {imageUrl ? (
                    <CldImage
                        src={imageUrl}
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

                {featured && (
                    <Badge
                        className="absolute left-3 top-3 gap-1"
                        variant="secondary"
                    >
                        <Award className="size-3.5" />
                        Featured
                    </Badge>
                )}
            </div>

            <CardContent>
                <div className="flex items-start justify-between gap-2">
                    <h3 className="truncate text-lg font-bold text-foreground">
                        {name}
                    </h3>

                    {/*<span className="flex shrink-0 items-center gap-1 text-sm font-bold text-secondary">
                        <Star className="size-4 fill-current" />
                        {rating.toFixed(1)}
                    </span>*/}
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
                            if (isAuthenticated) handleAddToCart();
                            else toast.error("Need to login!!!");
                        }}
                    >
                        <Plus className="size-5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
