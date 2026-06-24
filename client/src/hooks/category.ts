// src/hooks/useGetCategories.ts

import { useQuery } from "@tanstack/react-query";

import { getCategories, getCategoryById } from "@/api/category";

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
