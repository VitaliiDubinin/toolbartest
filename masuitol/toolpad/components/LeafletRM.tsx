import React, { useEffect, useRef, useState } from "react";
import L, { Map as LeafletMap} from "leaflet";
//import { Control } from "leaflet";
import { createComponent } from "@mui/toolpad-core";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import { Geocoder } from 'leaflet-control-geocoder';
//import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
//import 'leaflet-control-geocoder/dist/Control.Geocoder.js';






const markerIconUrl =
  "https://esm.sh/leaflet@1.9.4/dist/images/marker-icon.png";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

async function createLeafletStyles(doc: Document) {
  let styles = doc.getElementById("leaflet-css");
  if (styles) {
    return;
  }
  const res1 = await fetch("https://esm.sh/leaflet/dist/leaflet.css");
  const res2 = await fetch(
    "https://esm.sh/leaflet-routing-machine/dist/leaflet-routing-machine.css"
  );
  const res3 = await fetch(
    "https://esm.sh/leaflet-control-geocoder/dist/Control.Geocoder.css"
  );
//   const Geocoder = await fetch(
//     "https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"
//   );
    
  if (!res1.ok || !res2.ok || !res3.ok) {
    throw new Error(
      `HTTP ${res1.status}: ${res1.statusText}, HTTP ${res2.status}: ${res2.statusText}, HTTP ${res3.status}: ${res3.statusText}`
    );
  }
  const leafletCss = await res1.text();
  const leafletRoutingCss = await res2.text();
  const leafletControlGeocoderCss = await res3.text();
  styles = doc.createElement("style");
  styles.id = "leaflet-css";
  const css = doc.createTextNode(
    leafletCss + leafletRoutingCss + leafletControlGeocoderCss
  );
  styles.appendChild(css);
  doc.head.appendChild(styles);
}

export interface MapProps {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  zoom: number;
}


function MapComponent({ startLat, startLng, endLat, endLng, zoom }: MapProps) {
    //const mapRef = useRef<typeof LeafletMap | undefined>();
    const mapRef = useRef<LeafletMap | undefined>();
//    const controlRef = useRef<typeof L.Routing.control | undefined>();
    const controlRef = useRef<L.Routing.Control | undefined>();
  const root = useRef<HTMLDivElement | null>(null);
  const [stylesInitialized, setStylesInitialized] = useState(false);
  const [error, setError] = useState<Error>();
  // const [scriptInitialized, setScriptInitialized] = useState(false);
    const [data, setData] = useState([]);

  


  useEffect(() => {
    if (root.current) {
      const doc = root.current.ownerDocument;
      createLeafletStyles(doc).then(
        () => setStylesInitialized(true),
        (err) => setError(err)
      );
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current && root.current && stylesInitialized) {
      mapRef.current = new LeafletMap(root.current, {
        center: [42.57, 27.523],
        zoom: 13,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(mapRef.current);

        
        
        
      const control = L.Routing.control({
        waypoints: [
          L.latLng(startLat, startLng), // START YOU MARKER LOCATION
          L.latLng(endLat, endLng), // END YOU MARKER LOCATION
        ],

        //geocoder: L.Control.Geocoder.nominatim(),
        geocoder: new Geocoder(),  
    
        routeWhileDragging: true,
        //reverseWaypoints: true,
        routeDragInterval: 100,
        showAlternatives: true,
        altLineOptions: {
          styles: [
            { color: "black", opacity: 0.15, weight: 14 },
            { color: "white", opacity: 0.8, weight: 6 },
            { color: "blue", opacity: 0.5, weight: 2 },
          ],
          extendToWaypoints: true,
          missingRouteTolerance: 2739, 
        },
      });

      control.addTo(mapRef.current);

      const doc = root.current.ownerDocument;
      const instructionsPanel = doc.querySelector(
        ".leaflet-routing-container"
      ) as HTMLElement;
      if (instructionsPanel) {
        instructionsPanel.style.display = "none";
      }

      control.on("routeselected", (e) => {
        console.log("e", e);
        const routeData = e.route;

        const numberOfWaypoints = routeData.inputWaypoints.length;
        const newData = Array.from(
          { length: numberOfWaypoints },
          (_, index) => `point${index + 1}`
        );
        // setData(newData);
        console.log("data", data);
        console.log("newData", newData); // Use newData instead of the previous state data
      });

      controlRef.current = control;
    }
    if (mapRef.current && controlRef.current) {
      mapRef.current.setZoom(zoom);
      controlRef.current.setWaypoints([
        L.latLng(startLat, startLng),
        L.latLng(endLat, endLng),
      ]);
    }
  }, [stylesInitialized, startLat, startLng, endLat, endLng, zoom]);

  return (
    <div style={{ height: 400, width: 600 }}>
      {error ? (
        error.message
      ) : (
        <div style={{ width: "100%", height: "100%" }} ref={root} />
      )}
    </div>
  );
}


export default createComponent(MapComponent, {
argTypes: {
    // msg: {
    //   type: "string",
    //     default: "Hello world!",
    //        },
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
