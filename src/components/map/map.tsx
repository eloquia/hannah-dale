"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const [zoom] = useState(9);

  maptilersdk.config.apiKey = '7TXsrGyKHwP0PiuVOrbt';

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current!,
      style: "dataviz",
      center: [-117.120830, 32.760840], // starting position [lng, lat]
      zoom: zoom, // starting zoom
    });
  }, []);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
