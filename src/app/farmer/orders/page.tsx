"use client";
import * as React from "react";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { getMyOrders } from "@/actions/order";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/column";

export default function Page() {
  const getOrders = getMyOrders(0, 10, "status", "ASC");
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-4 flex overflow-auto">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here's a list of your orders!
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <Suspense
            fallback={
              <DataTableSkeleton
                columnCount={5}
                searchableColumnCount={1}
                filterableColumnCount={2}
                cellWidths={["10rem", "10rem", "12rem", "12rem", "8rem"]}
                shrinkZero
              />
            }
          >
            <DataTable ordersPromise={getOrders} columns={columns} />
          </Suspense>
        </div>
      </div>
    </>
  );
  // }
  // return <p>You session expired! Please login again!</p>;
}
