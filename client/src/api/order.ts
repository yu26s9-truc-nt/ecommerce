import { StatusCodes } from "http-status-codes";

import { Order } from "@/models/order";

import request from "./axios";

export const createOrder = () =>
    request<undefined, Order>(
        {
            url: "orders",
            method: "post",
        },
        {
            [StatusCodes.CREATED]: {
                title: "Created order successfully",
            },
        },
        true
    );
