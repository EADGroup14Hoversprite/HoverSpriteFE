"use client";

import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";
import L from "leaflet";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-control-geocoder/dist/Control.Geocoder.js"

interface MapRoutingProps {
  waypoints: [number, number][];
  startPosition: [number, number];
}

const MapRouting: React.FC<MapRoutingProps> = ({ waypoints, startPosition }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Add routing control
    const routingControl = L.Routing.control({
      router: L.Routing.osrmv1({
        serviceUrl: 'http://router.project-osrm.org/route/v1/',
      }),
      showAlternatives: true,
      lineOptions: { styles: [{ color: '#242c81', weight: 7 }], extendToWaypoints: false, missingRouteTolerance: 2 },
      fitSelectedRoutes: false,
      altLineOptions: { styles: [{ color: '#ed6852', weight: 7 }], extendToWaypoints: true, missingRouteTolerance: 2 },
      show: true,
      routeWhileDragging: false,
      geocoder: L.Control.Geocoder.nominatim(), //this still works even tho there's an error indicator, i have no idea why
      waypoints: [L.latLng(startPosition), ...waypoints.map(point => L.latLng(point))],
    }).addTo(map);

    // Clean up routing control on component unmount
    return () => {
      map.removeControl(routingControl);
    };
  }, [map, waypoints, startPosition]);

  return null;
};

export default MapRouting;
