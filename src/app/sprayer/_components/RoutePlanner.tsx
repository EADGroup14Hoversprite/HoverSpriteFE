"use client";
import RoutingMap from "@/components/map/RoutingMap";

export default function Page() {
  return (
    <div className="relative flex justify-center h-full items-center w-full bg-gray-100 overflow-hidden">
      {/* Map Container */}
      <div className="w-full h-full" >
        <RoutingMap />
      </div>
    </div>
  );
}
