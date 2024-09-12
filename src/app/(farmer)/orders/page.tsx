"use client";
import { IOrder } from "@/models/Order";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/column";
import { getMyOrders } from "@/actions/order";
import { useUserStore } from "@/store/user-store";
import { useEffect, useState } from "react";

export default function Page() {
  const { currentUser } = useUserStore();
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    if (currentUser) {
      const getOrders = async () => {
        return await getMyOrders(currentUser.accessToken);
      };
      getOrders().then((res) => {
        console.log(res);
        setOrders(res.orders);
      });
    }
  }, [currentUser?.accessToken]);
  return (
    <div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here's a list of your tasks for this month!
            </p>
          </div>
        </div>
        <DataTable data={orders} columns={columns} />
      </div>
    </div>
  );
}
