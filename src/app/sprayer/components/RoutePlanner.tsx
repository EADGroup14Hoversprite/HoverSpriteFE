import MapComponent from "@/components/map/mapComponent";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-4xl h-96 bg-gray-200 shadow-lg rounded-lg overflow-hidden">
        <MapComponent />
      </div>
    </div>
  );
}
