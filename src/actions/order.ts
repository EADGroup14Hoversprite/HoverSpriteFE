import { OrderType } from "@/schema";
import { IOrder } from "@/models/Order";
import axios from "axios";

const backendUrl = "http://localhost:8080";

export async function createOrder(
  value: Partial<OrderType>,
  accessToken: string,
  farmerName: string,
  farmerPhoneNumber: string,
) {
  try {
    const res = await axios.post<{
      message: string;
      order: IOrder;
      error?: boolean;
    }>(
      "http://localhost:8080/order",
      {
        ...value,
        farmerName: farmerName,
        farmerPhoneNumber: farmerPhoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res.data;
  } catch (e) {
    throw new Error("Unable to create order");
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
