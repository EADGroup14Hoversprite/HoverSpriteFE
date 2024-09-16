import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/column";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
// import { getAllOrders } from "@/actions/order"; // Update with the receptionist order fetching logic
import { cookies } from "next/headers";
// import AssignSprayerDropdown from "@/components/assign-sprayer-dropdown"; // Example component for assigning sprayers

export default async function ReceptionistPage() {
  const cookieStore = cookies();
  const session = cookieStore.get("sessionToken")?.value;

  if (session) {
    // const getOrders = getAllOrders(session, 0, 10, "status", "ASC"); // Fetch all orders instead of only farmer's

    return (
      <div>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Receptionist Dashboard
              </h2>
              <p className="text-muted-foreground">
                Manage all orders and assign sprayers
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Suspense
              fallback={
                <DataTableSkeleton
                  columnCount={6} 
                  searchableColumnCount={1}
                  filterableColumnCount={2}
                  cellWidths={["10rem", "10rem", "12rem", "12rem", "8rem", "8rem"]}
                  shrinkZero
                />
              }
            >
              {/* <DataTable ordersPromise={getOrders} columns={columns} extraColumn={AssignSprayerDropdown} /> Add the AssignSprayer component */}
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
  return <p>Your session expired! Please login again!</p>;
}
