import { StatusCodes } from "http-status-codes";

import request from "./axios";

type SignUpRequest = {
    email: string;
    username: string;
    password: string;
};

export const signUp = (data: SignUpRequest) =>
    request<SignUpRequest, string>(
        {
            url: "auth/sign-up",
            method: "post",
            data,
        },
        {
            [StatusCodes.FORBIDDEN]: {
                title: "User already exists",
            },
        }
    );

type SignInRequest = {
    email: string;
    password: string;
};

export const signIn = (data: SignInRequest) =>
    request<SignInRequest, string>(
        {
            url: "auth/sign-in",
            method: "post",
            data,
        },
        {
            [StatusCodes.NOT_FOUND]: {
                title: "User not found",
            },
        }
    );

export const getAccessToken = () =>
    request<undefined, string>(
        {
            url: "auth/access-token",
            method: "post",
        },
        undefined,
        false
    );

export const signOut = () =>
    request<undefined, string>({
        url: "auth/sign-out",
        method: "post",
    });
