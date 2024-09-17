"use client";
import React, { useState, useEffect, useCallback } from "react";
import Map, { Marker, Source, Layer, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css"; // Import for the map styles
import mapboxgl from "mapbox-gl"; // Import Mapbox GL JS to use with the map

const MAPBOX_TOKEN = "pk.eyJ1Ijoia3J1c2t5dGFuayIsImEiOiJjbTE0eDVhMWwwMnV2MmtzODB4YmN2emdrIn0.jr0k_CKW6e3bDpVAVuAi8Q"; // Replace with your Mapbox access token

interface RoutingMapProps {
  lat: number;
  lon: number;
}

const RoutingMap: React.FC<RoutingMapProps> = ({ lat, lon }) => {
  const [viewport, setViewport] = useState({
    latitude: 10.8231, // Default latitude (Ho Chi Minh City)
    longitude: 106.6297, // Default longitude (Ho Chi Minh City)
    zoom: 12,
  });

  const [searchInput, setSearchInput] = useState(""); // For manual search input
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState<{ lat: number; lng: number } | null>({ lat, lng: lon });
  const [route, setRoute] = useState<any>(null);
  const [mapRef, setMapRef] = useState<any>(null);

  // Debouncing function to limit API calls
  const debounce = (func: Function, delay: number) => {
    let timeoutId: any;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch address suggestions from Nominatim (OpenStreetMap) and Mapbox (fallback)
  const fetchSuggestions = async (input: string) => {
    setLoadingSuggestions(true);
    try {
      if (input.trim().length > 2) {
        const nominatimResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json&limit=5&countrycodes=VN`
        );
        const nominatimData = await nominatimResponse.json();

        if (nominatimData && nominatimData.length > 0) {
          setSuggestions(nominatimData);
        } else {
          const mapboxResponse = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
              input
            )}.json?access_token=${MAPBOX_TOKEN}&limit=5&country=VN`
          );
          const mapboxData = await mapboxResponse.json();
          setSuggestions(mapboxData.features);
        }
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleSearchChangeDebounced = useCallback(debounce(fetchSuggestions, 500), []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchInput(input);
    handleSearchChangeDebounced(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const isCoordinates = (input: string): boolean => {
    const regex = /^-?\d+(\.\d+)?,\s?-?\d+(\.\d+)?$/;
    return regex.test(input);
  };

  const handleSearchSubmit = async () => {
    if (isCoordinates(searchInput)) {
      const [latitude, longitude] = searchInput.split(",").map((coord) => parseFloat(coord.trim()));
      if (!isNaN(latitude) && !isNaN(longitude)) {
        setDestinationCoordinates({ lat: latitude, lng: longitude });
      } else {
        alert("Invalid latitude and longitude");
      }
    } else {
      if (suggestions.length > 0) {
        fetchCoordinates(suggestions[0]);
      } else {
        await fetchSuggestions(searchInput);
        if (suggestions.length > 0) {
          fetchCoordinates(suggestions[0]);
        } else {
          alert("Address not found");
        }
      }
    }
  };

  const fetchCoordinates = async (suggestion: any) => {
    const { lat, lon, geometry } = suggestion;

    if (lat && lon) {
      setDestinationCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
    } else if (geometry && geometry.coordinates) {
      setDestinationCoordinates({ lat: geometry.coordinates[1], lng: geometry.coordinates[0] });
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setViewport((prevViewport) => ({
            ...prevViewport,
            latitude,
            longitude,
          }));
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  };

  const fetchRoute = async () => {
    if (userLocation && destinationCoordinates) {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.lng},${userLocation.lat};${destinationCoordinates.lng},${destinationCoordinates.lat}?steps=true&geometries=geojson&access_token=${MAPBOX_TOKEN}`
      );
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        setRoute(data.routes[0].geometry);
      }
    }
  };

  useEffect(() => {
    getUserLocation(); // Get user's location on component mount
  }, []);

  // Fetch route when either destination coordinates change or user location is available
  useEffect(() => {
    if (userLocation && destinationCoordinates) {
      fetchRoute();
    }
  }, [destinationCoordinates, userLocation]);

  const isValidCoordinates = (coordinates: { lat: number; lng: number } | null) =>
    coordinates && !isNaN(coordinates.lat) && !isNaN(coordinates.lng);

  return (
    <div className="relative w-full h-screen">


      <Map
        initialViewState={viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%", zIndex: 0 }}
        onMove={(evt) => setViewport(evt.viewState)}
        ref={setMapRef}
      >
        {/* Navigation Control (Zoom in/out) */}
        <NavigationControl position="top-right" />

        {/* If user location is available and valid, drop a marker */}
        {isValidCoordinates(userLocation) && (
          <Marker latitude={userLocation.lat} longitude={userLocation.lng} color="blue">
            <div className="text-sm bg-white rounded-full px-2 py-1 shadow-md">You are here</div>
          </Marker>
        )}

        {/* Drop a marker for the destination if the coordinates are valid */}
        {isValidCoordinates(destinationCoordinates) && (
          <Marker latitude={destinationCoordinates.lat} longitude={destinationCoordinates.lng} color="red">
            <div className="text-sm bg-white rounded-full px-2 py-1 shadow-md">Destination</div>
          </Marker>
        )}

        {/* Display the route */}
        {route && (
          <Source id="route" type="geojson" data={route}>
            <Layer
              id="routeLayer"
              type="line"
              paint={{
                "line-color": "#3b9ddd",
                "line-width": 4,
              }}
            />
          </Source>
        )}
      </Map>

            {/* Manual Search Input */}
            <div className="absolute top-5 left-5 w-72">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          placeholder="Search by address or 'lat, lon'"
          className="p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {/* Display address suggestions */}
        {loadingSuggestions ? (
          <div className="bg-white shadow-lg rounded-md mt-2 p-3">Loading...</div>
        ) : (
          suggestions.length > 0 && (
            <ul className="bg-white shadow-lg rounded-md max-h-40 overflow-y-auto mt-2">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id || suggestion.id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => fetchCoordinates(suggestion)}
                >
                  {suggestion.display_name || suggestion.place_name}
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
};

export default RoutingMap;
