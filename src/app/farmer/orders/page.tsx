"use client";
import * as React from "react";
import { Suspense, useEffect } from "react";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { getMyOrders } from "@/actions/order";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/column";
import CustomPagination from "@/components/data-table/custom-pagination";
import { useOrderPaginationStore } from "@/store/use-orders-pagination";

export default function Page() {
  const {
    currentPage,
    pageSize,
    options,
    setCurrentPage,
    canPrevPage,
    setCanNextPage,
    setCanPrevPage,
    canNextPage,
    maxPage,
    setMaxPage,
    setPageSize,
  } = useOrderPaginationStore();
  const getOrders = getMyOrders(currentPage, pageSize, "status", "ASC");

  useEffect(() => {
    const fetchOrders = async () =>
      await getMyOrders(currentPage, pageSize, "status", "ASC");

    fetchOrders().then((res) => {
      setMaxPage(res.maxPage);
    });
  }, []);

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
            <div className="flex flex-col gap-2 flex-1">
              <DataTable ordersPromise={getOrders} columns={columns} />
              <CustomPagination
                currentPage={currentPage}
                pageSize={pageSize}
                setCurrentPage={setCurrentPage}
                canPrevPage={canPrevPage}
                canNextPage={canNextPage}
                pageSizeOptions={options}
                maxPage={maxPage}
                setPageSize={setPageSize}
              />
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
  // }
  // return <p>You session expired! Please login again!</p>;
}
