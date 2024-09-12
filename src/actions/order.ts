import { OrderType } from "@/schema";
import { IOrder } from "@/models/Order";
import axios from "axios";

const backendUrl = "http://localhost:8080";

export async function createOrder(value: OrderType) {
  try {
    const res = await axios.post<{
      message: string;
      order: IOrder;
      error?: boolean;
    }>(`${backendUrl}/order/create`, { ...value });
    return res.data;
  } catch (e) {
    return {
      error: true,
      message: "Unable to create order",
    };
  }
}

export async function getMyOrders(accessToken: string) {
  try {
    const res = await axios.get<{
      message: string;
      orders: IOrder[];
      error?: boolean;
    }>(`http://localhost:8080/order/my-orders`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (e) {
    return {
      error: true,
      message: "Unable to get user orders",
      orders: [],
    };
  }
}
