import OrderHistoryTable from "../_components/OrderHistoryTable";

export default function Page() {
  return (
    <section className="rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Order History
      </h2>
      <OrderHistoryTable />
    </section>
  );
}
