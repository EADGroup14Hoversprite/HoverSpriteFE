import AssignedOrdersTable from "./components/AssignedOrdersTable";
import OrderHistoryTable from "./components/OrderHistoryTable";

export default function Page() {
  return (
    <div>
      {/* Display the assigned orders table */}
      <AssignedOrdersTable />

      {/* Display the order history table */}
      <OrderHistoryTable />
    </div>
  );
}
