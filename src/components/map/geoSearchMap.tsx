"use client";

//This is a basic map with only address lookup function
import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });
  L.Marker.prototype.options.icon = defaultIcon;

// GeoSearch component
const GeoSearch: React.FC<{ onAddressSelect: (latlng: L.LatLng, address: string) => void }> = ({ onAddressSelect }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new (GeoSearchControl as any)({
      provider,
      style: 'bar',
      showMarker: true,
      retainZoomLevel: false,
      autoClose: true,
      keepResult: true,
      marker: {
        draggable: false,
      },
    });

    map.addControl(searchControl);

    map.on('geosearch/showlocation', (event: any) => {
        const { x: lat, y: lng } = event.location || {}; 
        const latlng = L.latLng(lat, lng);
        const address = event.location.label;
        onAddressSelect(latlng, address); 
    });

    return () => {
      map.removeControl(searchControl);
    };
  }, [map, onAddressSelect]);

  return null;
};

const GeoSearchMap: React.FC = () => {
  const handleAddressSelect = (latlng: L.LatLng, address: string) => {
    console.log("Selected address:", address, "Coordinates:", latlng);
    // You can store the address or do something with it here
  };

  return (
    <MapContainer
      center={[14.0583, 108.2772]} 
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoSearch onAddressSelect={handleAddressSelect} />

    </MapContainer>
  );
};

export default GeoSearchMap;