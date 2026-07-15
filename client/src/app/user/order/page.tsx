"use client";

import React from "react";

import FormLoader from "@/components/loaders/FormLoader";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetOrders } from "@/hooks/order";

export default function UserOrdersPage() {
    const { data: response, isLoading, error } = useGetOrders();
    const orders = response?.data;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full min-h-[50vh]">
                Loading...
            </div>
        );
    }

    if (error) {
        return <div className="p-4 text-red-500">Error loading your orders. Please try again.</div>;
    }

    if (!orders || !Array.isArray(orders) || orders.length === 0) {
        return <div className="p-4 text-gray-500">You have no past orders.</div>;
    }

    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
                <p className="text-muted-foreground mt-2">View and manage your recent purchases.</p>
            </div>

            <Separator />

            <div className="grid gap-6 md:grid-cols-2">
                {orders.map((order: any) => (
                    <Card key={order.orderId} className="flex flex-col justify-between shadow-sm">
                        <CardHeader className="bg-muted/30 py-4 px-4">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-lg">Order #{order.orderId}</CardTitle>
                                <span className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="space-y-2">
                                <h4 className="font-semibold text-sm">Items:</h4>
                                <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside ml-4">
                                    {/* Using order.product.name for the display name */}
                                    {order.orderLineItems.map((item: any) => (
                                        <li key={item.orderLineItemId}>
                                            {item.product?.name || `Product ID: ${item.productId}`} - {item.quantity} x ${item.salesPrice.toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-2 border-t bg-muted/10 pt-4">
                            <div className="flex justify-between w-full text-sm">
                                <span className="text-muted-foreground">Shipping:</span>
                                <span>${order.shippingAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between w-full font-bold text-lg">
                                <span>Total:</span>
                                {/* Dynamically displaying the total calculated by your backend */}
                                <span>${order.total ? order.total.toFixed(2) : "0.00"}</span>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
