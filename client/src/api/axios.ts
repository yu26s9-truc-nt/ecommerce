import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { toast } from "sonner";

import { getAccessToken } from "@/api/auth";

export const axiosDefault = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const processQueue = (token: string | null) => {
    refreshSubscribers.forEach((callback) => callback(token as string));
    refreshSubscribers = [];
};

axiosDefault.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

axiosDefault.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    refreshSubscribers.push((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(axiosDefault(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const res = await getAccessToken();
                const newAccessToken = res.data;

                localStorage.setItem("accessToken", newAccessToken);

                processQueue(newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return axiosDefault(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);

                localStorage.removeItem("accessToken");

                window.location.href = "/";
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

const request = async <D = unknown, T = unknown>(
    config: AxiosRequestConfig<D>,
    responseMessage?: Record<number, { title: string; description?: string }>,
    showMessage = false
): Promise<AxiosResponse<T>> => {
    try {
        showMessage = showMessage || config.method?.toLowerCase() !== "get";
        const res = await axiosDefault.request<T, AxiosResponse<T>, D>(config);

        const message = responseMessage?.[res.status] ?? {
            title: handleResponseStatus(res.status),
            description: "Operation completed successfully.",
        };

        if (showMessage && typeof window !== "undefined") {
            toast.success(message.title, {
                description: message.description,
            });
        }

        return res;
    } catch (error) {
        const axiosError = error as AxiosError;
        const status = axiosError.response?.status ?? 0;

        const message = responseMessage?.[status] ?? {
            title: handleResponseStatus(status),
            description:
                axiosError.response?.statusText ||
                axiosError.message ||
                "Something went wrong.",
        };

        if (showMessage && typeof window !== "undefined") {
            toast.error(message.title, {
                description: message.description,
            });
        }

        throw axiosError;
    }
};

const handleResponseStatus = (statusCode: number, message?: string): string => {
    switch (statusCode) {
        case StatusCodes.OK:
        case StatusCodes.CREATED:
        case StatusCodes.ACCEPTED:
        case StatusCodes.NO_CONTENT:
            return message || "Request successful.";

        case StatusCodes.BAD_REQUEST:
            return message || ReasonPhrases.BAD_REQUEST;

        case StatusCodes.UNAUTHORIZED:
            return message || ReasonPhrases.UNAUTHORIZED;

        case StatusCodes.FORBIDDEN:
            return message || ReasonPhrases.FORBIDDEN;

        case StatusCodes.NOT_FOUND:
            return message || ReasonPhrases.NOT_FOUND;

        case StatusCodes.CONFLICT:
            return message || ReasonPhrases.CONFLICT;

        case StatusCodes.TOO_MANY_REQUESTS:
            return message || ReasonPhrases.TOO_MANY_REQUESTS;

        case StatusCodes.INTERNAL_SERVER_ERROR:
            return message || ReasonPhrases.INTERNAL_SERVER_ERROR;

        case StatusCodes.BAD_GATEWAY:
            return message || ReasonPhrases.BAD_GATEWAY;

        case StatusCodes.SERVICE_UNAVAILABLE:
            return message || ReasonPhrases.SERVICE_UNAVAILABLE;

        case StatusCodes.GATEWAY_TIMEOUT:
            return message || ReasonPhrases.GATEWAY_TIMEOUT;

        default:
            return message || "Unexpected error occurred.";
    }
};

export default request;
