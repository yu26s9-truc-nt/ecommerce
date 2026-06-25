// src/hooks/useGetCategories.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategoryById,
    putCategory,
} from "@/api/category";
import {
    Category,
    CategoryCreateRequest,
    CategoryUpdateRequest
} from "@/models/category";

export const useGetCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        select: (res) => res.data,
    });
};

export const useGetCategory = (categoryId: number) => {
    return useQuery({
        queryKey: ["categories", categoryId],
        queryFn: () => getCategoryById(categoryId),
        enabled: !!categoryId,
        select: (res) => res.data,
    });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CategoryCreateRequest) => createCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};

export const useUpdateCategoryFull = (categoryId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CategoryUpdateRequest) =>
            putCategory(categoryId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (categoryId: number) => deleteCategory(categoryId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};
