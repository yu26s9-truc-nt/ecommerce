import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createOptionGroup, deleteOptionGroup, getOptionGroupById, getOptionGroups, patchOptionGroup, putOptionGroup } from "@/api/option-group";
import type { OptionGroupUpdateRequest } from "@/models/option-group";

export const optionGroupKeys = {
    all: ["optionGroups"] as const,
    detail: (optionGroupId: number) => ["optionGroups", optionGroupId] as const,
};

export const useGetOptionGroups = () => {
    return useQuery({
        queryKey: optionGroupKeys.all,
        queryFn: getOptionGroups,
        select: (res) => res.data,
    });
};

export const useGetOptionGroup = (optionGroupId: number) => {
    return useQuery({
        queryKey: optionGroupKeys.detail(optionGroupId),
        queryFn: () => getOptionGroupById(optionGroupId),
        enabled: !!optionGroupId,
        select: (res) => res.data,
    });
};

export const useCreateOptionGroup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createOptionGroup,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: optionGroupKeys.all,
            });
        },
    });
};

export const useUpdateOptionGroupFull = (optionGroupId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: OptionGroupUpdateRequest) => putOptionGroup(optionGroupId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: optionGroupKeys.all,
            });

            queryClient.invalidateQueries({
                queryKey: optionGroupKeys.detail(optionGroupId),
            });
        },
    });
};

export const useUpdateOptionGroupPartial = (optionGroupId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<OptionGroupUpdateRequest>) => patchOptionGroup(optionGroupId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: optionGroupKeys.all,
            });

            queryClient.invalidateQueries({
                queryKey: optionGroupKeys.detail(optionGroupId),
            });
        },
    });
};

export const useDeleteOptionGroup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteOptionGroup,
        onSuccess: (_, optionGroupId) => {
            queryClient.invalidateQueries({
                queryKey: optionGroupKeys.all,
            });

            queryClient.removeQueries({
                queryKey: optionGroupKeys.detail(optionGroupId),
            });
        },
    });
};
