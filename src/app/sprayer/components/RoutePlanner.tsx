"use client";
import MapComponent from "@/components/map/mapComponent";

export default function Page() {

  return (
    <div className="relative flex justify-center items-center w-full h-screen bg-gray-100 overflow-hidden">
      {/* Full-screen Map Container */}
      <div className="absolute inset-0">
        <MapComponent />
      </div>
    </div>
  );
}
