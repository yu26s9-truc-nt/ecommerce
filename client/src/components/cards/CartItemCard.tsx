"use client";

import { Trash2 } from "lucide-react";
import { CldImage } from "next-cloudinary";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useUpdateCartItem } from "@/hooks/cart";
import type { CartItem } from "@/models/cart";

export type CartItemCardProps = CartItem;

export function CartItemCard({
    product,
    quantity,
    discountPercent,
    lineTotal,
}: CartItemCardProps) {
    const { mutate: removeCartItem, isPending: isRemoving } =
        useUpdateCartItem();

    const { mutate: updateCartItemQuantity, isPending: isUpdating } =
        useUpdateCartItem();

    return (
        <Card className="overflow-hidden">
            <CardContent className="flex gap-3 p-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                    {product.imageUrl ? (
                        <CldImage
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            crop={{ type: "auto", source: true }}
                            className="object-cover"
                            loading="eager"
                        />
                    ) : (
                        <div className="flex size-full items-center justify-center text-xs text-muted-foreground">
                            No image
                        </div>
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <CardHeader className="flex flex-row px-0 pt-0 justify-between">
                        <div className="min-w-0">
                            <CardTitle className="text-base font-semibold">
                                {product.name}
                            </CardTitle>

                            {product.subCategory && (
                                <CardDescription className="mt-0.5 truncate text-xs">
                                    {product.subCategory}
                                </CardDescription>
                            )}

                            <div className="mt-1 text-xs text-muted-foreground">
                                {discountPercent > 0
                                    ? `${discountPercent}% discount`
                                    : "No discount"}
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                removeCartItem({
                                    productId: product.productId,
                                    quantity: 0,
                                })
                            }
                            disabled={isRemoving || isUpdating}
                            className="h-8 w-8 shrink-0 text-muted-foreground"
                        >
                            <Trash2 className="size-4" />
                            <span className="sr-only">Remove item</span>
                        </Button>
                    </CardHeader>

                    <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center rounded-full bg-muted p-1">
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-7 rounded-full"
                                onClick={() =>
                                    updateCartItemQuantity({
                                        productId: product.productId,
                                        quantity: quantity - 1,
                                    })
                                }
                                disabled={
                                    isRemoving || isUpdating || quantity <= 1
                                }
                            >
                                −
                            </Button>

                            <span className="w-8 text-center text-sm font-semibold">
                                {quantity}
                            </span>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-7 rounded-full"
                                onClick={() =>
                                    updateCartItemQuantity({
                                        productId: product.productId,
                                        quantity: quantity + 1,
                                    })
                                }
                                disabled={isRemoving || isUpdating}
                            >
                                +
                            </Button>
                        </div>

                        <div className="text-base font-semibold">
                            {lineTotal.toFixed(2)}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
