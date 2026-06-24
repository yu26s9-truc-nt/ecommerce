"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useCreateOrder } from "@/hooks/order";
import type { RootState } from "@/store/store";

import { CartItemCard } from "../cards/CartItemCard";

export type CartSelectedOption = {
    label: string;
};

export type CartItem = {
    lineId: string;
    name: string;
    emoji?: string;
    selected: CartSelectedOption[];
    qty: number;
    price: number;
};

type CartSheetsProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function CartSheets({ open, onOpenChange }: CartSheetsProps) {
    const { mutate: createOrder } = useCreateOrder();

    const cartItems = useSelector(
        (state: RootState) => state.cartReducer.items
    );

    const subtotal = cartItems.reduce((acc, item) => acc + item.lineTotal, 0);
    const delivery = 0;
    const total = useSelector((state: RootState) => state.cartReducer.total);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="flex w-full flex-col p-0 sm:max-w-md"
            >
                <SheetHeader className="border-b px-4 py-4 text-left">
                    <SheetTitle className="text-2xl font-semibold">
                        Your Cart
                    </SheetTitle>
                    <SheetDescription>
                        Review your items before checkout.
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-1">
                    <div className="p-4">
                        {cartItems.length === 0 ? (
                            <div className="flex min-h-[55vh] flex-col items-center justify-center rounded-2xl border border-dashed p-6 text-center">
                                <h3 className="text-xl font-semibold">
                                    Your cart&apos;s empty
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Add some treats to get started!
                                </p>

                                <Button asChild className="mt-5">
                                    <Link
                                        href="/"
                                        onClick={() => onOpenChange(false)}
                                    >
                                        Browse Menu
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {cartItems.map((item) => (
                                    <CartItemCard
                                        key={item.product.productId}
                                        {...item}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </ScrollArea>

                <SheetFooter className="border-t bg-background p-4">
                    <div className="w-full space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                Subtotal
                            </span>

                            <span className="font-semibold">
                                ${subtotal.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                Delivery
                            </span>

                            <span className="font-semibold">
                                ${delivery.toFixed(2)}
                            </span>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                            <span className="text-base font-semibold">
                                Total
                            </span>

                            <span className="text-xl font-bold">
                                ${total.toFixed(2)}
                            </span>
                        </div>

                        <Button
                            type="button"
                            className="mt-4 w-full"
                            onClick={() => createOrder()}
                            disabled={cartItems.length === 0}
                        >
                            <ShoppingCart className="mr-2 size-4" />
                            Checkout
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
