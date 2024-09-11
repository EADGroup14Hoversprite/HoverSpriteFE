"use server";

import { OrderType } from "@/schema";
import { IOrder } from "@/models/Order";
import { API } from "@/utils/utils";

export async function createOrder(value: OrderType) {
  const res = await API.post<{ message: string; order: IOrder }>(
    "/order/create",
    { ...value },
  );
  return res.data;
}
