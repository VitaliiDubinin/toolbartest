// *********************
//that is the original code from the https://github.com/mui/mui-toolpad/issues/864
//**********************

// // import * as React from "react";
// import React, { useRef, useEffect, useState } from 'react';
// import { createComponent } from "@mui/toolpad-core";

// // import * as L from "https://esm.sh/leaflet";
// import L from 'leaflet';



// export interface LeafletProps {
//   lat: number;
//   long: number;
//   zoom: number;
// }

// async function createLeafletStyles(doc) {
//   let styles = doc.getElementById("leaflet-css");
//   if (styles) {
//     return;
//   }
//   const res = await fetch("https://esm.sh/leaflet/dist/leaflet.css");
//   if (!res.ok) {
//     throw new Error(`HTTP ${res.status}: ${res.statusText}`);
//   }
//   const css = await res.text();
//   styles = doc.createElement("style");
//   styles.id = "leaflet-css";
//   styles.appendChild(doc.createTextNode(css));
//   doc.head.appendChild(styles);
// }

// function Leaflet({ lat, long, zoom }: LeafletProps) {
//   const root = React.useRef(null);
//   const mapRef = React.useRef<any>();
//   const [stylesInitialized, setStylesIitialized] = React.useState(false);
//   const [error, setError] = React.useState<Error>();

// //   React.useEffect(() => {
// //     const doc = root.current.ownerDocument;
// //     createLeafletStyles(doc).then(
// //       () => setStylesIitialized(true),
// //       (err) => setError(err)
// //     );
//     //   }, []);

    
//     React.useEffect(() => {
//   if (root.current) {
//     const doc = root.current.ownerDocument;
//     createLeafletStyles(doc).then(
//       () => setStylesIitialized(true),
//       (err) => setError(err)
//     );
//   }
// }, []);

//   React.useEffect(() => {
//     if (!mapRef.current && stylesInitialized) {
//       mapRef.current = L.map(root.current);
//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         maxZoom: 19,
//         attribution: "© OpenStreetMap",
//       }).addTo(mapRef.current);
//     }

//     if (mapRef.current) {
//       mapRef.current.setView([lat, long], zoom);
//     }
//   }, [stylesInitialized, lat, long, zoom]);

//   return (
//     <div style={{ height: 400, width: 600 }}>
//       {error ? (
//         error.message
//       ) : (
//         <div style={{ width: "100%", height: "100%" }} ref={root} />
//       )}
//     </div>
//   );
// }

// export default createComponent(Leaflet, {
//   argTypes: {
//     lat: {
//       typeDef: { type: "number" },
//       defaultValue: 51.505,
//     },
//     long: {
//       typeDef: { type: "number" },
//       defaultValue: -0.09,
//     },
//     zoom: {
//       typeDef: { type: "number" },
//       defaultValue: 13,
//     },
//   },
// });

//*************adapted code  BELOW*/

import React, { useRef, useEffect, useState } from 'react';
import { createComponent } from "@mui/toolpad-core";
import L, { Map as LeafletMap } from 'leaflet'; 

export interface LeafletProps {
  lat: number;
  long: number;
  zoom: number;
}

async function createLeafletStyles(doc: Document) {
  let styles = doc.getElementById("leaflet-css");
  if (styles) {
    return;
  }
  const res = await fetch("https://esm.sh/leaflet/dist/leaflet.css");
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  const css = await res.text();
  styles = doc.createElement("style");
  styles.id = "leaflet-css";
  styles.appendChild(doc.createTextNode(css));
  doc.head.appendChild(styles);
}

function Leaflet({ lat, long, zoom }: LeafletProps) {
  const root = useRef<HTMLDivElement | null>(null);
  //const mapRef = useRef<LeafletMap | undefined>(); // Use the alias 'LeafletMap'

    const mapRef = useRef<typeof LeafletMap | undefined>();
    
  const [stylesInitialized, setStylesInitialized] = useState(false);
  const [error, setError] = useState<Error | undefined>();

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
    if (!mapRef.current && stylesInitialized) {
      mapRef.current = new LeafletMap(root.current as HTMLElement); 

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(mapRef.current);
    }

    if (mapRef.current) {
      mapRef.current.setView([lat, long], zoom);
    }
  }, [stylesInitialized, lat, long, zoom]);

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

export default createComponent(Leaflet, {
  argTypes: {
    lat: {
      type: "number", 
      defaultValue: 51.505,
    },
    long: {
      type: "number", 
      defaultValue: -0.09,
    },
    zoom: {
      type: "number", 
      defaultValue: 13,
    },
  },
});