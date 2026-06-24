// hooks/useGetProducts.ts

import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@/api/product";

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
