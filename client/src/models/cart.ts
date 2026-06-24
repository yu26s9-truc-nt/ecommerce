import type { Product } from "@/models/product";

export type CartItem = {
    product: Product;
    quantity: number;
    discountPercent: number;
    lineTotal: number;
};

export type Cart = {
    items: Record<string, CartItem>;
    total: number;
};

export type CartItemUpdateRequest = {
    quantity: number;
};
