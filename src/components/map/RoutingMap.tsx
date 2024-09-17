"use client";
import React, { useState, useEffect } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoia3J1c2t5dGFuayIsImEiOiJjbTE0eDVhMWwwMnV2MmtzODB4YmN2emdrIn0.jr0k_CKW6e3bDpVAVuAi8Q'; // Your Mapbox access token

interface RoutingMapProps {
  destination?: string; // The destination address or coordinates passed in
}

const RoutingMap: React.FC<RoutingMapProps> = ({ destination }) => {
  const [viewport, setViewport] = useState({
    latitude: 10.8231, // Default latitude (Ho Chi Minh City)
    longitude: 106.6297, // Default longitude (Ho Chi Minh City)
    zoom: 12,
  });

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [route, setRoute] = useState<any>(null); // Store the route data

  // Fetch coordinates from an address using a geocoding API (e.g., Mapbox Geocoding API)
  const fetchCoordinates = async (address: string) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=${MAPBOX_TOKEN}`
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const { center } = data.features[0]; // Center contains [longitude, latitude]
      setCoordinates({ lat: center[1], lng: center[0] }); // Update coordinates
    }
  };

  // Use Geolocation API to get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setViewport({ ...viewport, latitude, longitude }); // Update the map center to user location
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  };

  // Fetch route between userLocation and destination
  const fetchRoute = async () => {
    if (userLocation && coordinates) {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.lng},${userLocation.lat};${coordinates.lng},${coordinates.lat}?steps=true&geometries=geojson&access_token=${MAPBOX_TOKEN}`
      );
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        setRoute(data.routes[0].geometry); // Store the route geometry (a GeoJSON line)
      }
    }
  };

  useEffect(() => {
    if (destination) {
      fetchCoordinates(destination); // Fetch destination coordinates when destination is provided
    }
  }, [destination]);

  useEffect(() => {
    getUserLocation(); // Get user's current location when the component mounts
  }, []);

  useEffect(() => {
    fetchRoute(); // Fetch the route whenever userLocation or destination coordinates are updated
  }, [userLocation, coordinates]);

  return (
    <div className="w-full h-full">
      <Map
        initialViewState={viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11" // You can choose other Mapbox styles
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        onMove={(evt) => setViewport(evt.viewState)}
      >
        {/* If user location is available, drop a marker on the user's current location */}
        {userLocation && (
          <Marker latitude={userLocation.lat} longitude={userLocation.lng} color="blue">
            <div className="text-sm bg-white rounded-full px-2 py-1 shadow-md">
              You are here
            </div>
          </Marker>
        )}

        {/* If destination coordinates are available, drop a marker for the destination */}
        {coordinates && (
          <Marker latitude={coordinates.lat} longitude={coordinates.lng} color="red" />
        )}

        {/* Display the route as a line on the map */}
        {route && (
          <Source id="route" type="geojson" data={route}>
            <Layer
              id="routeLayer"
              type="line"
              paint={{
                'line-color': '#3b9ddd',
                'line-width': 4,
              }}
            />
          </Source>
        )}
      </Map>
    </div>
  );
};

export default RoutingMap;