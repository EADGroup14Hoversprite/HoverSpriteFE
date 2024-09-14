import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/column";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { getMyOrders } from "@/actions/order";
import { cookies } from "next/headers";

export default async function Page() {
  // const [orders, setOrders] = useState<IOrder[]>([]);
  const cookieStore = cookies();
  const session = cookieStore.get("sessionToken")?.value;

  if (session) {
    const getOrders = getMyOrders(session, 0, 10, "status", "ASC");
    return (
      <div>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back!
              </h2>
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
              {/**
               * Passing promises and consuming them using React.use for triggering the suspense fallback.
               * @see https://react.dev/reference/react/use
               */}
              <DataTable ordersPromise={getOrders} columns={columns} />
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
  return <p>You session expired! Please login again!</p>;
}
