import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapBoxComponentProps {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  zoom: number;
}

function MapBoxComponent({ startLat, startLng, endLat, endLng, zoom }: MapBoxComponentProps) {
    //const mapContainer = useRef<HTMLDivElement | null>(null);
      const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2FuZXJ2YSIsImEiOiJjbHNjNnpza3Uwa2FrMmlvNWNpYTN5bzBiIn0.wCkSebd9BeT4zpV2a_ygAg';
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [startLng, startLat],
      zoom: zoom,
      maxZoom: 19,
    });

    return () => map.remove(); // Cleanup
  }, [startLat, startLng, zoom]);

  return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
}

export default MapBoxComponent;