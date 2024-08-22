'use client';
import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Map() {
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string, //create a .env.local file and assign the api key to that variable
        version: "weekly",
      });

      
      const { Map } = await loader.importLibrary("maps");

      const locationInMap = {
        lat: 14.0583,
        lng: 108.2772,
      };

      //Marker

      const options: google.maps.MapOptions = {
        center: locationInMap,
        zoom: 7,
        mapId: "VietNamMap",
      };

      const map = new Map(mapRef.current as HTMLDivElement, options)

      

    };

    initializeMap();
  }, []);

  return <div className="h-[600px] w-full" ref={mapRef} >Google Map</div>;
}
