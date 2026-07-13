import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getProfile, putProfile } from "@/api/profile";

export const profileQueryKey = ["profile"] as const;

export const useGetProfile = () => {
    return useQuery({
        queryKey: profileQueryKey,
        queryFn: getProfile,
        select: (res) => res.data,
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: putProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: profileQueryKey });
        },
    });
};
