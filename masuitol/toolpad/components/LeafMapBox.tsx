import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { createComponent } from "@mui/toolpad-core";





export interface MapProps {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  zoom: number;
}

function MapComponent({ startLat, startLng, endLat, endLng, zoom }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2FuZXJ2YSIsImEiOiJjbHNjNnpza3Uwa2FrMmlvNWNpYTN5bzBiIn0.wCkSebd9BeT4zpV2a_ygAg'; // Replace with your Mapbox access token

    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [(startLng + endLng) / 2, (startLat + endLat) / 2],
        zoom: zoom,
        maxZoom: 19,
      });

      map.on('load', () => {

       
        // Add route
        const route = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [startLng, startLat],
              [endLng, endLat]
            ],
          },
        };

        map.addSource("route", {
          type: "geojson",
          data: route,
        });

        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#888",
            "line-width": 8,
          },
        });

        map.addLayer({
          id: "route",
          type: "circle",
          source: "route",
          paint: {
            "circle-color": "#3887be", // Color of the route markers
            "circle-radius": 8, // Radius of the route markers
          },
        });
        
   
        const startMarkerData = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [startLng, startLat]
          },
          properties: {}
        };

        const endMarkerData = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [endLng, endLat]
          },
          properties: {}
        };

        map.addSource("start-marker", {
          type: "geojson",
          data: startMarkerData
        });

        map.addSource("end-marker", {
          type: "geojson",
          data: endMarkerData
        });

        map.addLayer({
          id: "start-marker",
          type: "symbol",
          source: "start-marker",
          layout: {
            "icon-image": "marker-15",
            "icon-size": 1.5
          }
        });

        map.addLayer({
          id: "end-marker",
          type: "symbol",
          source: "end-marker",
          layout: {
            "icon-image": "marker-15",
            "icon-size": 1.5
          }
        });


        const bounds = new mapboxgl.LngLatBounds();
        bounds.extend(startMarkerData.geometry.coordinates);
        bounds.extend(endMarkerData.geometry.coordinates);

        map.fitBounds(bounds, {
          padding: 50, // Adjust padding as needed
        });
      });


    // const markersData = {
    //       type: 'FeatureCollection',
    //       features: [
    //         {
    //           type: 'Feature',
    //           geometry: {
    //             type: 'Point',
    //             coordinates: [startLng, startLat]
    //           },
    //           properties: {
    //             title: 'Start',
    //             icon: 'marker'
    //           }
    //         },
    //         {
    //           type: 'Feature',
    //           geometry: {
    //             type: 'Point',
    //             coordinates: [endLng, endLat]
    //           },
    //           properties: {
    //             title: 'End',
    //             icon: 'marker'
    //           }
    //         }
    //       ]
    //     };

    //     // Add markers as symbol layers
    //     map.addSource('markers', {
    //       type: 'geojson',
    //       data: markersData
    //     });

    //     // Add layer for start marker
    //     map.addLayer({
    //       id: 'start-marker',
    //       type: 'symbol',
    //       source: 'markers',
    //       filter: ['==', 'title', 'Start'],
    //       layout: {
    //         'icon-image': '{icon}-15',
    //         'icon-size': 1.5,
    //         'icon-allow-overlap': true
    //       }
    //     });

    //     // Add layer for end marker
    //     map.addLayer({
    //       id: 'end-marker',
    //       type: 'symbol',
    //       source: 'markers',
    //       filter: ['==', 'title', 'End'],
    //       layout: {
    //         'icon-image': '{icon}-15',
    //         'icon-size': 1.5,
    //         'icon-allow-overlap': true
    //       }
    //     });
    //     const bounds = new mapboxgl.LngLatBounds();
    //     bounds.extend([startLng, startLat]);
    //     bounds.extend([endLng, endLat]);

    //     map.fitBounds(bounds, {
    //       padding: 50, // Adjust padding as needed
    //     });
    //   });




 

      return () => {
        map.remove(); // Clean up the map instance when component unmounts
      };
    }
  }, [startLat, startLng, endLat, endLng, zoom]);

  return (
    <div style={{ height: 400, width: 600 }} ref={mapContainerRef}>
      {error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        ''
      )}
    </div>
  );
}


// function MapComponent({ startLat, startLng, endLat, endLng, zoom }: MapProps) {
//   const mapContainerRef = useRef<HTMLDivElement | null>(null);
//   const [error, setError] = useState<Error | null>(null);
//     const mapRef = useRef<mapboxgl.Map | null>(null);
//   const markersRef = useRef<mapboxgl.Marker[]>([]);

//   useEffect(() => {
//     mapboxgl.accessToken = 'pk.eyJ1Ijoia2FuZXJ2YSIsImEiOiJjbHNjNnpza3Uwa2FrMmlvNWNpYTN5bzBiIn0.wCkSebd9BeT4zpV2a_ygAg'; // Replace with your Mapbox access token
//     if (mapContainerRef.current) {
//       const map = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [(startLng + endLng) / 2, (startLat + endLat) / 2],
//         zoom: zoom,
//         maxZoom: 19,
//       });
//  map.on("load", () => {
// //      new mapboxgl.Marker().setLngLat([startLng, startLat]).addTo(map);
// //      new mapboxgl.Marker().setLngLat([endLng, endLat]).addTo(map);
//       const startMarker = new mapboxgl.Marker().setLngLat([startLng, startLat]).addTo(map);
//       const endMarker = new mapboxgl.Marker().setLngLat([endLng, endLat]).addTo(map);

//       const bounds = new mapboxgl.LngLatBounds();
//       bounds.extend(startMarker.getLngLat());
//       bounds.extend(endMarker.getLngLat());

//       map.fitBounds(bounds, {
//         padding: 50, // Adjust padding as needed
//       });
//       const route = {
//         type: "Feature",
//         properties: {},
//         geometry: {
//           type: "LineString",
//           coordinates: [
//             [startLng, startLat],
//                   [startLng+1, startLat+1]
//         //    [endLng, endLat]
//           ],
//         },
//       };

//       // map.on("load", () => {
//         map.addSource("route", {
//           type: "geojson",
//           data: route,
//         });

//         map.addLayer({
//           id: "route",
//           type: "line",
//           source: "route",
//           layout: {
//             "line-join": "round",
//             "line-cap": "round",
//           },
//           paint: {
//             "line-color": "#888",
//             "line-width": 8,
//           },
//         });
//       });

//       return () => {
//         map.remove(); // Clean up the map instance when component unmounts
//       };
//     }
//   }, [startLat, startLng, endLat, endLng, zoom]);

//   return (
//     <div style={{ height: 400, width: 600 }} ref={mapContainerRef}>
//       {error ? (
//         error.message
//       ) : (
//         ""
//       )}
//     </div>
//   );
// }

// function MapComponent({ startLat, startLng, endLat, endLng, zoom }: MapProps) {
//   const mapContainerRef = useRef<HTMLDivElement | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const mapRef = useRef<mapboxgl.Map | null>(null);
//   const markersRef = useRef<mapboxgl.Marker[]>([]);

//   useEffect(() => {
//     mapboxgl.accessToken = 'pk.eyJ1Ijoia2FuZXJ2YSIsImEiOiJjbHNjNnpza3Uwa2FrMmlvNWNpYTN5bzBiIn0.wCkSebd9BeT4zpV2a_ygAg'; // Replace with your Mapbox access token
//     if (!mapRef.current && mapContainerRef.current) {
//       try {
//         mapRef.current = new mapboxgl.Map({
//           container: mapContainerRef.current,
//           style: 'mapbox://styles/mapbox/streets-v11',
//           center: [(startLng + endLng) / 2, (startLat + endLat) / 2],
//           zoom: zoom,
//           maxZoom: 19,
//         });
//       } catch (error) {
//         setError("Failed to initialize map: " + error.message);
//       }
//     }

//     // Ensure map and container are available
//     if (mapRef.current && mapContainerRef.current) {
//       // Clear existing markers
//       markersRef.current.forEach(marker => marker.remove());
//       markersRef.current = [];

//       // Add new markers
//       try {
//         const startMarker = new mapboxgl.Marker().setLngLat([startLng, startLat]).addTo(mapRef.current);
//         const endMarker = new mapboxgl.Marker().setLngLat([endLng, endLat]).addTo(mapRef.current);

//         // Update markers reference
//         markersRef.current = [startMarker, endMarker];
//       } catch (error) {
//         setError("Failed to add markers: " + error.message);
//       }
//     }

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove(); // Clean up the map instance when component unmounts
//       }
//     };
//   }, [startLat, startLng, endLat, endLng, zoom]);

//   return (
//     <div style={{ height: 400, width: 600 }} ref={mapContainerRef}>
//       {error && (
//         <div style={{ color: 'red' }}>{error}</div>
//       )}
//     </div>
//   );
// }


export default createComponent(MapComponent, {
argTypes: {

    startLat: {
      type: "number",
      defaultValue: 42.54,
    },
    startLng: {
      type: "number",
      defaultValue: 27.453,
    },
    endLat: {
      type: "number",
      defaultValue: 42.659,
    },
    endLng: {
      type: "number",
      defaultValue: 27.736,
    },
    zoom: {
      type: "number",
      defaultValue: 13,
    },
   
    },
});
