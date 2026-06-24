import { StatusCodes } from "http-status-codes";

import request from "./axios";

export type Authority = {
    name: string;
};

export type User = {
    id: number;
    username: string;
    authorities: Authority[];
};

type RegisterRequest = {
    username: string;
    password: string;
    confirmPassword: string;
    role: "USER" | "ADMIN";
};

type RegisterResponse = User;

export const register = (data: RegisterRequest) =>
    request<RegisterRequest, RegisterResponse>(
        {
            url: "register",
            method: "post",
            data,
        },
        {
            [StatusCodes.FORBIDDEN]: {
                title: "User already exists",
            },
        }
    );

type LoginRequest = {
    username: string;
    password: string;
};

type LoginResponse = {
    token: string;
    user: User;
};

export const login = (data: LoginRequest) =>
    request<LoginRequest, LoginResponse>(
        {
            url: "login",
            method: "post",
            data,
        },
        {
            [StatusCodes.NOT_FOUND]: {
                title: "User not found",
            },
            [StatusCodes.UNAUTHORIZED]: {
                title: "Invalid username or password",
            },
            [StatusCodes.OK]: {
                title: "Login successfully!!",
            },
        },
        true
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
