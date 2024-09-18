"use client";
import RoutingMap from "@/components/map/RoutingMap";

export default function Page() {
  return (
    <div className="relative flex justify-center h-full items-center w-full bg-gray-100 overflow-hidden">
      {/* Map Container */}
      <div className="md:col-span-2 w-full h-full bg-gray-200 rounded-lg overflow-hidden shadow-inner">
        <div className="h-full">
          <RoutingMap />
        </div>
      </div>
    </div>
  );
}
