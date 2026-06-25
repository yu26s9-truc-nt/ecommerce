import { useQuery } from "@tanstack/react-query";

import { createProduct, getProducts } from "@/api/product";

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
        queryKey: ["products", params],
        queryFn: () => getProducts(params),
        select: (res) => res.data,
    });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProduct, putProduct } from "@/api/product";
import type {
    Product,
    ProductCreateRequest,
    ProductUpdateRequest,
} from "@/models/product";

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: ProductCreateRequest) => {
            const response = await createProduct(data);
            return response.data;
        },
        onSuccess: (createdProduct: Product) => {
            queryClient.invalidateQueries({ queryKey: productKeys.all });
            queryClient.setQueryData(
                productKeys.detail(createdProduct.productId),
                createdProduct
            );
        },
    });
}

export const useUpdateProductFull = (productId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: ProductUpdateRequest) => {
            const response = await putProduct(productId, data);
            return response.data;
        },
        onSuccess: (updatedProduct: Product) => {
            queryClient.invalidateQueries({ queryKey: productKeys.all });
            queryClient.setQueryData(
                productKeys.detail(updatedProduct.productId),
                updatedProduct
            );
        },
    });
};

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: number) => deleteProduct(productId),
        onSuccess: (_data, productId) => {
            queryClient.invalidateQueries({ queryKey: productKeys.all });
            queryClient.removeQueries({
                queryKey: productKeys.detail(productId),
            });
        },
    });
}
