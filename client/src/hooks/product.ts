import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getProducts } from "@/api/product";
import { createProduct, deleteProduct, putProduct } from "@/api/product";
import type { ProductUpdateRequest } from "@/models/product";

export const productKeys = {
    all: ["products"] as const,
    detail: (productId: number) => ["products", productId] as const,
};

type Params = {
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    subCategory?: string;
};

export const useGetProducts = (params?: Params) => {
    return useQuery({
        queryKey: [...productKeys.all, params],
        queryFn: () => getProducts(params),
        select: (res) => res.data,
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProduct,
        onSuccess: (res) => {
            const product = res.data;

            queryClient.invalidateQueries({
                queryKey: productKeys.all,
            });

            queryClient.setQueryData(productKeys.detail(product.productId), product);
        },
    });
};

export const useUpdateProductFull = (productId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ProductUpdateRequest) => putProduct(productId, data),
        onSuccess: (res) => {
            const product = res.data;

            queryClient.invalidateQueries({
                queryKey: productKeys.all,
            });

            queryClient.setQueryData(productKeys.detail(product.productId), product);
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: (_, productId) => {
            queryClient.invalidateQueries({
                queryKey: productKeys.all,
            });

            queryClient.removeQueries({
                queryKey: productKeys.detail(productId),
            });
        },
    });
};
