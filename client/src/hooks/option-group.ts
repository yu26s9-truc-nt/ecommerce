// src/hooks/optionGroup.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
    createOptionGroup,
    deleteOptionGroup,
    getOptionGroupById,
    getOptionGroups,
    patchOptionGroup,
    putOptionGroup,
} from "@/api/option-group";
import {
    OptionGroupCreateRequest,
    OptionGroupUpdateRequest,
} from "@/models/option-group";

export const useGetOptionGroups = () => {
    return useQuery({
        queryKey: ["optionGroups"],
        queryFn: getOptionGroups,
        select: (res) => res.data,
    });
};

export const useGetOptionGroup = (optionGroupId: number) => {
    return useQuery({
        queryKey: ["optionGroups", optionGroupId],
        queryFn: () => getOptionGroupById(optionGroupId),
        enabled: !!optionGroupId,
        select: (res) => res.data,
    });
};

export const useCreateOptionGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: OptionGroupCreateRequest) => createOptionGroup(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["optionGroups"] });
        },
    });
};

export const useUpdateOptionGroupFull = (optionGroupId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: OptionGroupUpdateRequest) =>
            putOptionGroup(optionGroupId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["optionGroups"] });
        },
    });
};

export const useUpdateOptionGroupPartial = (optionGroupId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<OptionGroupUpdateRequest>) =>
            patchOptionGroup(optionGroupId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["optionGroups"] });
        },
    });
};

export const useDeleteOptionGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (optionGroupId: number) => deleteOptionGroup(optionGroupId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["optionGroups"] });
        },
    });
};
