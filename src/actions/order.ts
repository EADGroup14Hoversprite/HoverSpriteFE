import { OrderType } from "@/schema";
import { IOrder } from "@/models/Order";
import API from "@/utils/axiosClient";

export async function createOrder(value: Partial<OrderType>) {
  try {
    const res = await API.post<{
      message: string;
      order: IOrder;
      error?: boolean;
    }>("/order", {
      ...value,
    });
    return res.data;
  } catch (e) {
    throw new Error("Unable to create order");
  }
}

export async function paypalOrder(orderId: number) {
  try {
    const res = await API.post<{ successUrl: string; cancelUrl: string }>(
      `/order/${orderId}/create-payment`,
    );
    return res.data;
  } catch (e) {
    throw new Error("Cannot proceed with paypal");
  }
}

export async function getOrderRange(start: number, end: number) {
  try {
    const res = await API.get<{
      message: string;
      orders: IOrder[];
      error?: boolean;
    }>(`/order/by-date-range?startDate=${start}&endDate=${end}`);
    return res.data;
  } catch (e) {
    return {
      message: "Cannot get order in the range",
      error: true,
      orders: [],
    };
  }
}

export async function getOrderByDate(date: Date) {
  const time = date.getTime();
  try {
    const res = await API.get<{
      message: string;
      orders: IOrder[];
      error?: boolean;
    }>(`/order/by-date?desireDate=${time}`);
    return res.data;
  } catch (e) {
    return {
      message: "Cannot get order in the range",
      error: true,
      orders: [],
    };
  }
}

export async function getMyOrders(
  accessToken: string,
  page: number,
  pageSize: number,
  sortBy: "status",
  sortDirection: "ASC",
) {
  try {
    const res = await API.get<{
      message: string;
      orders: IOrder[];
      error?: boolean;
    }>(
      `/order/my-orders?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res.data;
  } catch (e) {
    return {
      error: true,
      message: "Unable to get user orders",
      orders: [],
    };
  }
}
