"use client";

import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

//Marker for the map
interface LocationMarkerProps {
  setPosition: React.Dispatch<React.SetStateAction<[number, number] | null>>;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ setPosition }) => {
  const map = useMap();

  useEffect(() => {
    const onLocationFound = (e: L.LocationEvent) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    };

    map.locate().on("locationfound", onLocationFound);

    return () => {
      map.off("locationfound", onLocationFound);
    };
  }, [map, setPosition]);

  return null; 
};

export default LocationMarker;
