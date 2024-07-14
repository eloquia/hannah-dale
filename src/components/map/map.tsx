"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';
import { HEX_BRIGHT_TEAL } from '@/constants/colors';

type MapProps = {
  getLngLat: (lng: number, lat: number) => void;
  initialLng: number;
  initialLat: number;
  // radius: number;
}

export default function MapGame(props: MapProps) {
  const { initialLng, initialLat, getLngLat } = props;
  const mapContainer = useRef(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const [zoom] = useState(9);

  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_KEY!;

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current!,
      style: maptilersdk.MapStyle.STREETS,
      center: [-117.120830, 32.760840], // starting position [lng, lat]
      zoom: zoom, // starting zoom
    });

    function onDragEnd() {
      const lngLat = marker.getLngLat();
      // console.log('Longitude: ' + lngLat.lng + ' | Latitude: ' + lngLat.lat);

      getLngLat(lngLat.lng, lngLat.lat);
    }

    // create a marker
    const marker = new maptilersdk.Marker({
      color: HEX_BRIGHT_TEAL,
      draggable: true,
      
    })
      .setLngLat([initialLng, initialLat])
      .addTo(map.current)
      .on('dragend', onDragEnd);

    // draw a circle
  }, [initialLat, initialLng, getLngLat]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
