"use client"

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// Define a component to add the routing control
const RoutingControl = () => {
  const map = useMap();

  useEffect(() => {
    L.Routing.control({
      router: L.Routing.osrmv1({
        serviceUrl: 'http://router.project-osrm.org/route/v1/'
      }),
      showAlternatives: true,
      lineOptions: { styles: [{ color: '#242c81', weight: 7 }], extendToWaypoints: false, missingRouteTolerance: 0 },
      fitSelectedRoutes: false,
      altLineOptions: { styles: [{ color: '#ed6852', weight: 7 }], extendToWaypoints: false, missingRouteTolerance: 0 },
      show: false,
      routeWhileDragging: true,
      waypoints: [
        L.latLng(57.74, 11.94),
        L.latLng(57.6792, 11.949)
      ]
    }).addTo(map);
  }, [map]);

  return null;
};

// Main Map component
const MapComponent: React.FC = () => {
  return (
    <MapContainer
      id="map-container"
      style={{ height: '100vh', width: '100%' }}
      center={[57.74, 11.94]} // Center the map at an initial location
      zoom={13}
    >
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <RoutingControl />
    </MapContainer>
  );
};

export default MapComponent;
