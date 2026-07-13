import { StatusCodes } from "http-status-codes";

import { Product, ProductCreateRequest, ProductFilterRequest, ProductUpdateRequest } from "@/models/product";

import request from "./axios";

export const getProducts = (params?: ProductFilterRequest) =>
    request<ProductFilterRequest | undefined, Product[]>({
        url: "products",
        method: "get",
        params,
    });

export const getProductById = (productId: number) =>
    request<undefined, Product>({
        url: `products/${productId}`,
        method: "get",
    });

export const createProduct = (data: ProductCreateRequest) =>
    request<ProductCreateRequest, Product>(
        {
            url: "products",
            method: "post",
            data,
        },
        {
            [StatusCodes.FORBIDDEN]: {
                title: "Admin access required",
            },
            [StatusCodes.BAD_REQUEST]: {
                title: "Invalid product data",
            },
        }
    );

export const putProduct = (productId: number, data: ProductUpdateRequest) =>
    request<ProductUpdateRequest, Product>(
        {
            url: `products/${productId}`,
            method: "put",
            data,
        },
        {
            [StatusCodes.FORBIDDEN]: {
                title: "Admin access required",
            },
            [StatusCodes.BAD_REQUEST]: {
                title: "Invalid product data",
            },
        }
    );

export const patchProduct = (productId: number, data: Product) =>
    request<Product, Product>(
        {
            url: `products/${productId}`,
            method: "patch",
            data,
        },
        {
            [StatusCodes.FORBIDDEN]: {
                title: "Admin access required",
            },
            [StatusCodes.BAD_REQUEST]: {
                title: "Invalid product data",
            },
        }
    );

export const deleteProduct = (productId: number) =>
    request<undefined, void>(
        {
            url: `products/${productId}`,
            method: "delete",
        },
        {
            [StatusCodes.FORBIDDEN]: {
                title: "Admin access required",
            },
            [StatusCodes.NOT_FOUND]: {
                title: "Product not found",
            },
        }
    );
