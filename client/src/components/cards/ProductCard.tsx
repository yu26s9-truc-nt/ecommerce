"use client";

import { Award, Plus } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useAddCartItem } from "@/hooks/cart";
import type { Product } from "@/models/product";
import type { RootState } from "@/store/store";

interface ProductCardProps {
    product: Product;
    rating?: number;
    isPreview?: boolean;
}

export default function ProductCard({
    product,
    isPreview = true,
}: ProductCardProps) {
    const addCartMutation = useAddCartItem();

    const handleAddToCart = () => {
        addCartMutation.mutate(product?.productId);
    };

    const { isAuthenticated } = useSelector(
        (state: RootState) => state.authReducer
    );

    return (
        <Card
            className="cursor-pointer shadow-[0_6px_18px_-10px_rgba(42,24,16,0.18)]
                transition-all duration-200 ease-in-out
                hover:-translate-y-1
                hover:shadow-[0_18px_40px_-16px_rgba(218,24,132,0.25)]"
        >
            <div className="relative aspect-square w-full overflow-hidden bg-muted">
                {product?.imageUrl ? (
                    <CldImage
                        src={product?.imageUrl}
                        alt={product?.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        crop={{ type: "auto", source: true }}
                        className="object-cover"
                        loading="eager"
                    />
                ) : (
                    <div className="aspect-square w-full bg-muted" />
                )}

                {product?.featured && (
                    <Badge
                        className="absolute left-3 top-3 gap-1"
                        variant="secondary"
                    >
                        <Award className="size-3.5" />
                        Featured
                    </Badge>
                )}
            </div>

            <CardContent className="p-5">
                <CardHeader className="px-0">
                    <CardTitle className="text-base">{product?.name}</CardTitle>

                    {/*<span className="flex shrink-0 items-center gap-1 text-sm font-bold text-secondary">
                        <Star className="size-4 fill-current" />
                        {rating.toFixed(1)}
                    </span>*/}
                </CardHeader>

                <CardDescription className="mt-1 line-clamp-2 h-10">
                    {product?.description}
                </CardDescription>

                <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-extrabold text-primary">
                        ${product?.price?.toFixed(2)}
                    </span>

                    {!isPreview && (
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
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
