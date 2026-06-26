import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getProfile, putProfile } from "@/api/profile";
import { ProfileUpdateRequest } from "@/models/profile";

/*export const useGetProfile = (userId: number) => {
    return useQuery({
        queryKey: ["profile", userId],
        queryFn: () => getProfile(userId),
        enabled: !!userId,
        select: (res) => res.data,
    });
};*/

export const useGetProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
        select: (res) => res.data,
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ProfileUpdateRequest) => putProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
};
