import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addCartItem, deleteCart, getCart, putCartItem } from "@/api/cart";
import type { Cart } from "@/models/cart";

export const cartQueryKey = ["cart"] as const;

export const useGetCart = (isAuthenticated: boolean) =>
    useQuery({
        queryKey: cartQueryKey,
        queryFn: getCart,
        enabled: isAuthenticated,
        select: (res) => res.data,
    });

export const useAddCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addCartItem,
        onSuccess: (data) => {
            queryClient.setQueryData(cartQueryKey, data);
        },
    });
};

export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) => putCartItem(productId, { quantity }),
        onSuccess: (res) => {
            queryClient.setQueryData(cartQueryKey, res.data);
        },
    });
};

export const useDeleteCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCart,
        onSuccess: () => {
            queryClient.setQueryData<Cart>(cartQueryKey, {
                items: {},
                total: 0,
            });
        },
    });
};
