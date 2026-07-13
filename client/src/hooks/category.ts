import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createCategory, deleteCategory, getCategories, getCategoryById, putCategory } from "@/api/category";
import { CategoryUpdateRequest } from "@/models/category";

export const categoriesQueryKey = ["categories"] as const;

export const categoryQueryKey = (categoryId: number) => ["categories", categoryId] as const;

export const useGetCategories = () => {
    return useQuery({
        queryKey: categoriesQueryKey,
        queryFn: getCategories,
        select: (res) => res.data,
    });
};

export const useGetCategory = (categoryId: number) => {
    return useQuery({
        queryKey: categoryQueryKey(categoryId),
        queryFn: () => getCategoryById(categoryId),
        enabled: !!categoryId,
        select: (res) => res.data,
    });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: categoriesQueryKey,
            });
        },
    });
};

export const useUpdateCategoryFull = (categoryId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CategoryUpdateRequest) => putCategory(categoryId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: categoriesQueryKey,
            });
            queryClient.invalidateQueries({
                queryKey: categoryQueryKey(categoryId),
            });
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: categoriesQueryKey,
            });
        },
    });
};
