export type Order = {
    userId: number;
    date: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    shippingAmount: number;
    orderId: number;
};

export type OrderCreateRequest = {
    address: string;
    city: string;
    state: string;
    zip: string;
};
