"use client";

import { useState } from "react";

import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

import OrderForm, { formId } from "@/components/forms/OrderForm";
import FormLoader from "@/components/loaders/FormLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetProfile } from "@/hooks/profile";
import type { RootState } from "@/store/store";

const Page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        data: profile = {
            phone: "",
            email: "",
            address: "",
            city: "",
            state: "",
            zip: "",
        },
        isLoading,
    } = useGetProfile();

    const cartItems = useSelector((state: RootState) => state.cartReducer.items);
    const subtotal = cartItems.reduce((acc, item) => acc + item.lineTotal, 0);
    const delivery = 0;
    const total = subtotal;

    return (
        <div className="min-h-screen bg-white px-4 py-6 md:px-8 md:py-10">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)]">
                <Card>
                    <CardContent>
                        <CardHeader>
                            <CardTitle className="text-3xl font-black tracking-tight text-[#2a1b14]">Checkout</CardTitle>
                            <CardDescription>Review your shipping details before placing the order.</CardDescription>
                        </CardHeader>

                        <FormLoader isLoading={isLoading} skeletonRows={[2, 2, 1, 3]}>
                            <OrderForm
                                initialValues={{
                                    address: profile?.address,
                                    city: profile?.city,
                                    state: profile?.state,
                                    zip: profile?.zip,
                                }}
                                onSuccessSubmit={() => setIsSubmitting(false)}
                                onErrorSubmit={() => setIsSubmitting(false)}
                            />
                        </FormLoader>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="space-y-6 px-6 pb-6 md:px-8 md:pb-8">
                        <CardHeader>
                            <CardTitle className="text-3xl font-black tracking-tight text-[#2a1b14]">Order Summary</CardTitle>
                            <CardDescription>Your current cart and final amount.</CardDescription>
                        </CardHeader>

                        <div className="space-y-4">
                            {cartItems.length === 0 ? (
                                <div className="rounded-2xl border border-dashed p-6 text-center">
                                    <p className="font-semibold text-[#2a1b14]">Your cart is empty</p>
                                    <p className="mt-1 text-sm text-muted-foreground">Add something before checkout.</p>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.product.productId} className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="font-semibold text-[#2a1b14]">
                                                {item.product.name} × {item.quantity}
                                            </p>
                                        </div>
                                        <p className="font-semibold text-[#2a1b14]">${item.lineTotal.toFixed(2)}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        <Separator />

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-semibold text-[#2a1b14]">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Delivery</span>
                                <span className="font-semibold text-[#2a1b14]">${delivery.toFixed(2)}</span>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-[#2a1b14]">Total</span>
                            <span className="text-3xl font-black text-pink-600">${total.toFixed(2)}</span>
                        </div>

                        <Button
                            form={formId}
                            type="submit"
                            disabled={cartItems.length === 0 || isSubmitting}
                            className="h-14 w-full rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-lg font-bold shadow-lg shadow-pink-200 hover:opacity-95"
                            onClick={() => {
                                setIsSubmitting(true);

                                const formHtmlElement = document.getElementById(formId) as HTMLFormElement | null;
                                if (formHtmlElement) {
                                    formHtmlElement.requestSubmit();
                                }
                            }}
                        >
                            <ShoppingCart className="mr-2 size-5" />
                            {isSubmitting ? "Placing Order..." : "Place Order 🎉"}
                        </Button>

                        <Button asChild variant="ghost" className="w-full text-base text-muted-foreground hover:bg-transparent hover:text-[#2a1b14]">
                            <Link href="/" className="inline-flex items-center gap-2">
                                <ArrowLeft className="size-4" />
                                Keep shopping
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Page;
