import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addCartItem, deleteCart, getCart, updateCartItem } from "@/api/cart";
import type { Cart } from "@/models/cart";

export const cartQueryKey = ["cart"] as const;

export const useGetCart = (isAuthenticated: boolean) =>
    useQuery<Cart>({
        queryKey: cartQueryKey,
        queryFn: async () => (await getCart()).data,
        enabled: isAuthenticated,
    });

export const useAddCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (productId: number) =>
            (await addCartItem(productId)).data,
        onSuccess: (data) => {
            queryClient.setQueryData(cartQueryKey, data);
        },
    });
};

export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: { productId: number; quantity: number }) =>
            (
                await updateCartItem(payload.productId, {
                    quantity: payload.quantity,
                })
            ).data,
        onSuccess: (data) => {
            queryClient.setQueryData(cartQueryKey, data);
        },
    });
};

export const useDeleteCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await deleteCart();
        },
        onSuccess: () => {
            queryClient.setQueryData<Cart>(cartQueryKey, {
                items: {},
                total: 0,
            });
        },
    });
};
