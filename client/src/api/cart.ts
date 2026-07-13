// src/api/cart.ts

import { StatusCodes } from "http-status-codes";

import type { Cart, CartItemUpdateRequest } from "@/models/cart";

import request from "./axios";

export const getCart = () =>
    request<undefined, Cart>({
        url: "cart",
        method: "get",
    });

export const addCartItem = (productId: number) =>
    request<undefined, Cart>(
        {
            url: `cart/products/${productId}`,
            method: "post",
        },
        {
            [StatusCodes.CREATED]: {
                title: "Add to cart successfully",
            },
        }
    );

export const putCartItem = (productId: number, data: CartItemUpdateRequest) =>
    request<CartItemUpdateRequest, Cart>({
        url: `cart/products/${productId}`,
        method: "put",
        data,
    });

export const deleteCart = () =>
    request<undefined, void>({
        url: "cart",
        method: "delete",
    });
