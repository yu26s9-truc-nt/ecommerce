import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createOrder } from "@/api/order";
import type { Cart } from "@/models/cart";
import { OrderCreateRequest } from "@/models/order";

import { cartQueryKey } from "./cart";

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: OrderCreateRequest) =>
            (await createOrder(data)).data,
        onSuccess: () => {
            queryClient.setQueryData<Cart>(cartQueryKey, {
                items: {},
                total: 0,
            });
            queryClient.removeQueries({
                queryKey: cartQueryKey,
            });
        },
    });
};
