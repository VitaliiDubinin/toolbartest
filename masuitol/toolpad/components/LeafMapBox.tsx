import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { createComponent } from "@mui/toolpad-core";

const testRouteGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [27.453, 42.54],
          [27.553, 42.59],
          [27.63, 42.62],
          [27.63, 42.64],
          [27.736, 42.659]
        ]
      }
    }
  ]
};



let newRouteGeoJSON: {
  type: string;
  features: {
    type: string;
    properties: {};
    geometry: {
      type: string;
      coordinates: number[][];
    };
  }[];
} = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [],
          []
        ]
      }
    }
  ]
};



async function createMapBoxDraw(doc: Document) {
  let styles = doc.getElementById("mapboxdraw-css");
  if (styles) {
    return;
  }
  const res1 = await fetch("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.css");
  // const res2 = await fetch(
  //   "https://esm.sh/leaflet-routing-machine/dist/leaflet-routing-machine.css"
  // );
  // const res3 = await fetch(
  //   "https://esm.sh/leaflet-control-geocoder/dist/Control.Geocoder.css"
  // );
//   const Geocoder = await fetch(
//     "https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"
//   );
    
  // if (!res1.ok || !res2.ok || !res3.ok) {
  if (!res1.ok ) {
    throw new Error(
      `HTTP ${res1.status}: ${res1.statusText}`
    );
  }
  const MapBoxDrawCss = await res1.text();

  styles = doc.createElement("style");
  styles.id = "mapboxdraw-css";
  const css = doc.createTextNode(
   MapBoxDrawCss 
  );
  styles.appendChild(css);
  doc.head.appendChild(styles);
}









export interface MapProps {
  maxZoom: number;
}

function MapComponent({ maxZoom }: MapProps) {
  //const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapContainerRef = useRef(null);
  const [error, setError] = useState<string | null>(null);

  const map = useRef<mapboxgl.Map | null>(null);

   const root = useRef<HTMLDivElement | null>(null);
  const [stylesInitialized, setStylesInitialized] = useState(false);
    const [drawnData, setDrawnData] = useState<any>(null); 


  const draw = useRef<MapboxDraw | null>(null); 
  
  const nav = new mapboxgl.NavigationControl();


    useEffect(() => {
    if (root.current) {
      const doc = root.current.ownerDocument;
      createMapBoxDraw(doc).then(
        () => setStylesInitialized(true),
        (err) => setError(err)
      );
    }
  }, []);

  
  
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2FuZXJ2YSIsImEiOiJjbHNjNnpza3Uwa2FrMmlvNWNpYTN5bzBiIn0.wCkSebd9BeT4zpV2a_ygAg';

    if (mapContainerRef.current) {
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [27.6, 42.6], 
        zoom: maxZoom,
      });





      map.current.on('load', () => {
     
        // map.current?.addSource("route", {
        //   type: "geojson",
        //   data: testRouteGeoJSON
        // });

        // map.current?.addLayer({
        //   id: "route",
        //   type: "line",
        //   source: "route",
        //   layout: {
        //     "line-join": "round",
        //     "line-cap": "round",
        //   },
        //   paint: {
        //     "line-color": "#878",
        //     "line-width": 8,
        //   },
        // });

        map.current?.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true
          }));

        map.current?.addControl(nav, 'top-left');

        map.current?.addControl(
new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl
})
);
        
        draw.current = new MapboxDraw({
          // Set your desired draw settings here
          displayControlsDefault: false,
          controls: {
            // line_string: true,
            // trash: true
          },
           styles: [
    // Set the line style for the user-input coordinates.
    {
      id: 'gl-draw-line',
      type: 'line',
      filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
   //     'line-color': '#438EE4',
        'line-color': 'red',
        'line-dasharray': [0.2, 2],
        'line-width': 4,
        'line-opacity': 0.7
      }
    },
    // Style the vertex point halos.
    {
      id: 'gl-draw-polygon-and-line-vertex-halo-active',
      type: 'circle',
      filter: [
        'all',
        ['==', 'meta', 'vertex'],
        ['==', '$type', 'Point'],
        ['!=', 'mode', 'static']
      ],
      paint: {
        'circle-radius': 12,
        'circle-color': '#FFF'
      }
             },
    
                 {
      'id': 'gl-draw-polygon-midpoint',
      'type': 'circle',
      'filter': ['all',
        ['==', '$type', 'Point'],
        ['==', 'meta', 'midpoint']],
      'paint': {
        'circle-radius': 5,
  //      'circle-color': '#fbb03b'
        'circle-color': 'green'
      }
    },
    // Style the vertex points.
    {
      id: 'gl-draw-polygon-and-line-vertex-active',
      type: 'circle',
      filter: [
        'all',
        ['==', 'meta', 'vertex'],
        ['==', '$type', 'Point'],
        ['!=', 'mode', 'static']
      ],
      paint: {
        'circle-radius': 8,
        'circle-color': '#438EE4'
      }
    }
   ],
          defaultMode: 'draw_line_string'
        });

        // Add Mapbox Draw to the map
        map.current?.addControl(draw.current);

        // Add event listeners to handle draw interactions
        map.current?.on('draw.create', () => {
          const data = draw.current?.getAll();
          console.log("New draw created:", data);
          // Perform actions with the drawn data as needed
        });

        map.current?.on('draw.update', () => {
          const data = draw.current?.getAll();
          console.log("Draw updated:", data);
          setDrawnData(data); // Update drawn data state
        });


        map.current?.on('draw.delete', () => {
          console.log("Draw deleted");
          // Perform actions when draw is deleted
        });
        
        
      });

      

      return () => {
        map.current?.remove();
      };
    }
  //}, [maxZoom]);
  }, []);


  
  return (
    <div style={{ height: 500, width: '100%' }} ref={mapContainerRef}>
      {error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
          // <div>Route data: {JSON.stringify(routeData)}</div>
          ''
      )}
    </div>
  );
}

export default createComponent(MapComponent, {
  argTypes: {
    maxZoom: {
      type: "number",
      defaultValue: 13,
    },
  },
});
