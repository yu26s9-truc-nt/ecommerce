import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createOrder, getOrders } from "@/api/order";
import type { Cart } from "@/models/cart";

import { cartQueryKey } from "./cart";

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            queryClient.setQueryData<Cart>(cartQueryKey, {
                items: {},
                total: 0,
            });
        },
    });
};
export const useGetOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
    });
};
