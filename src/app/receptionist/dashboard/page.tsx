import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/column";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { cookies } from "next/headers";

// Placeholder
// import { getAllOrders } from "@/actions/order"; 
// import AssignSprayerDropdown from "@/components/assign-sprayer-dropdown"; 

export default async function ReceptionistPage() {
  const cookieStore = cookies();
  const session = cookieStore.get("sessionToken")?.value;

  if (session) {

    // Placeholder
    // const getOrders = getAllOrders(session, 0, 10, "status", "ASC"); 

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
              {/* AssignSprayer component */}
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
  return <p>Your session expired! Please login again!</p>;
}
