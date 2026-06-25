// src/api/categories.ts

import { StatusCodes } from "http-status-codes";

import type {
    Category,
    CategoryCreateRequest,
    CategoryUpdateRequest,
} from "@/models/category";

import request from "./axios";

export const getCategories = () =>
    request<undefined, Category[]>({
        url: "categories",
        method: "get",
    });

export const getCategoryById = (categoryId: number) =>
    request<undefined, Category>({
        url: `categories/${categoryId}`,
        method: "get",
    });

export const getCategoryProducts = (categoryId: number) =>
    request<undefined, Category[]>({
        url: `categories/${categoryId}/products`,
        method: "get",
    });

export const createCategory = (data: CategoryCreateRequest) =>
    request<CategoryCreateRequest, Category>(
        {
            url: "categories",
            method: "post",
            data,
        },
        {
            [StatusCodes.FORBIDDEN]: {
                title: "Admin access required",
            },
        }
    );

export const putCategory = (
    categoryId: number,
    data: CategoryUpdateRequest
) =>
    request<CategoryUpdateRequest, Category>({
        url: `categories/${categoryId}`,
        method: "put",
        data,
    });

export const patchCategory = (
    categoryId: number,
    data: CategoryUpdateRequest
) =>
    request<CategoryUpdateRequest, Category>({
        url: `categories/${categoryId}`,
        method: "patch",
        data,
    });

export const deleteCategory = (categoryId: number) =>
    request<undefined, void>({
        url: `categories/${categoryId}`,
        method: "delete",
    });
