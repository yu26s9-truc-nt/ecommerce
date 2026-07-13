import { StatusCodes } from "http-status-codes";

import { Order, OrderCreateRequest } from "@/models/order";

import request from "./axios";

export const createOrder = (data: OrderCreateRequest) =>
    request<OrderCreateRequest, Order>(
        {
            url: "orders",
            method: "post",
            data,
        },
        {
            [StatusCodes.CREATED]: {
                title: "Created order successfully",
            },
        }
    );
