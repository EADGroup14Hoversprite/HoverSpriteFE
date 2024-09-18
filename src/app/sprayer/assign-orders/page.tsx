import { Suspense } from "react";
import AssignedOrdersTable from "../_components/AssignedOrdersTable";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export default function Page() {
  return (
    <section className="rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Assigned Orders
      </h2>
      <AssignedOrdersTable />
    </section>
  );
}
