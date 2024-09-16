"use client";

//This component is for the address lookup form
import React, { useState } from "react";

interface Address {
  display_name: string;
  lat: string;
  lon: string;
}

const GeoSearchForm: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query) return;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching geocode data:", error);
    }
  };

  const handleSelect = (address: Address) => {
    setSelectedAddress(address);
    setQuery(""); // Clear the input after selection
    setResults([]); // Clear the results list
  };

  
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSearch} className="flex flex-col space-y-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter an address"
          className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
      
      {results.length > 0 && (
        <ul className="mt-4 border border-gray-300 rounded-md bg-gray-50">
          {results.map((address) => (
            <li
              key={address.lat + address.lon}
              onClick={() => handleSelect(address)}
              className="p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
            >
              {address.display_name}
            </li>
          ))}
        </ul>
      )}

      {selectedAddress && (
        <div className="mt-6 p-4 border border-gray-300 rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Selected Address:</h3>
          <p className="text-gray-700">{selectedAddress.display_name}</p>
          <p className="text-gray-600">Latitude: {selectedAddress.lat}</p>
          <p className="text-gray-600">Longitude: {selectedAddress.lon}</p>
        </div>
      )}
    </div>
  );
};

export default GeoSearchForm;
