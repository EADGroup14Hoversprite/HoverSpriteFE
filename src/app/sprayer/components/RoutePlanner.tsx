"use client";
import RoutingMap from "@/components/map/RoutingMap";

export default function Page() {

  return (
    <div className="relative flex justify-center items-center w-full h-screen bg-gray-100 overflow-hidden">
      {/* Full-screen Map Container */}
      <div className="absolute inset-0" style={{ paddingBottom: '20px' }}>
        <RoutingMap />
      </div>
    </div>
  );
}
