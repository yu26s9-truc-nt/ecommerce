// store/cart.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { Cart, CartItem } from "@/models/cart";
import type { RootState } from "@/store/store";

type CartState = {
    items: CartItem[];
    total: number;
};

const initialState: CartState = {
    items: [],
    total: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart(state, action: PayloadAction<Cart>) {
            state.items = Object.values(action.payload.items);
            state.total = Number(action.payload.total) || 0;
        },

        clearCart(state) {
            state.items = [];
            state.total = 0;
        },
    },
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cartReducer.items;

export const selectCartCount = (state: RootState) =>
    state.cartReducer.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (state: RootState) => state.cartReducer.total;
