import {IOrder} from "@src/models/Order";

export type TOrderRequest = Pick<IOrder,
    "orderId" | "orderStatus" | "dateCreated" | "totalAmount" | "netAmount" | "deliverTo" | "orderItems"> &
    { accountId? : string };