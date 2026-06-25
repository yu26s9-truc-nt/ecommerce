import { StatusCodes } from "http-status-codes";

import type { Profile, ProfileUpdateRequest } from "@/models/profile";

import request from "./axios";

export const getProfile = () =>
    request<undefined, Profile>({
        url: `profile`,
        method: "get",
    });

export const putProfile = (data: ProfileUpdateRequest) =>
    request<ProfileUpdateRequest, Profile>({
        url: `profile`,
        method: "put",
        data,
    });

export const patchProfile = (data: ProfileUpdateRequest) =>
    request<ProfileUpdateRequest, Profile>(
        {
            url: `profile`,
            method: "patch",
            data,
        },
        {
            [StatusCodes.FORBIDDEN]: {
                title: "You don't have permission to update this profile",
            },
        }
    );