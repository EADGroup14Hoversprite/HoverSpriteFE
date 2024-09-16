import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface Address {
  display_name: string;
  lat: string;
  lon: string;
}

interface GeoSearchFormProps {
  onSelect: (address: string) => void; // Callback to pass the selected address
}

const GeoSearchForm: React.FC<GeoSearchFormProps> = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Address[]>([]);

  useEffect(() => {
    if (query.length > 2) {
      const delayDebounceFn = setTimeout(async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              query
            )}&format=json&addressdetails=1`
          );
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error("Error fetching geocode data:", error);
        }
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setResults([]); 
    }
  }, [query]);

  const handleSelect = (address: Address) => {
    onSelect(address.display_name);
    setQuery(""); // Clear the input after selection
    setResults([]); // Clear the results list
  };


  return (
    <div className="relative flex items-center border-b border-gray-500 py-2" >
      <Search strokeWidth={1} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for an address"
        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
      />
      {results.length > 0 && (
        <ul
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
          style={{
            top: "100%", // Position the dropdown just below the input field
            left: 0,
            right: 0,
          }}
        >
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
    </div>
  );
};

export default GeoSearchForm;
