import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createOrder } from "@/api/order";
import type { Cart } from "@/models/cart";

import { cartQueryKey } from "./cart";

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => (await createOrder()).data,
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
