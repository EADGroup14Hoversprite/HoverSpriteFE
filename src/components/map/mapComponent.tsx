"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapRouting from "./mapRouting"; 
import LocationMarker from "./locationMarker"; 

//The main map component
const MapComponent: React.FC = () => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

  const waypoints: [number, number][] = []; //can set predetermined way points here to display on map loads

  return (
    <MapContainer
      center={[14.0583, 108.2772]}
      zoom={15}
      scrollWheelZoom
      style={{ height: "100vh" }} //can adjust the height here
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapRouting 
        waypoints={waypoints}
        startPosition={userPosition || [14.0583, 108.2772]} // Default to center of Viet Nam if user position is not available
      />
      <LocationMarker setPosition={setUserPosition} />
    </MapContainer>
  );
};

export default MapComponent;
