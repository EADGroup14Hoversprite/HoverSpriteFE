import RoutePlanner from "../_components/RoutePlanner";

export default function Page() {
  return (
    <section className="rounded-lg p-6 flex flex-col h-[calc(100vh-64px)]">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Route Planning
      </h2>
      <div className="pb-6 flex-1">
        <RoutePlanner />
      </div>
    </section>
  );
}
