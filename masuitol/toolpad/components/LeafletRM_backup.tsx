//***************************
// That is my original code that I'm using for leaflet-routing
//***************************

// import React, { useEffect, useRef, useState } from 'react';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import 'leaflet-routing-machine';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
// import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
// import markerIcon from '../../../node_modules/leaflet/dist/images/marker-icon.png';
// import DataVisualization from '../../datavizual/DataVizualization';

// L.Marker.prototype.options.icon = L.icon({
//   iconUrl: markerIcon,
//   iconSize: [25, 41], 
//   iconAnchor: [12, 41], 
// });

// function MapComponent() {
//   const mapRef = useRef(null);
//   const [data, setData] = useState([]);


//   useEffect(() => {
//     function initmap() {
//       if (!mapRef.current) {
//         const map = L.map('youmap', {
//           center: [42.57, 27.523],
//           zoom: 13,
//         });

//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
//           map
//         );

//         const control = L.Routing.control({
//           waypoints: [
//             L.latLng(42.54, 27.453), // START YOU MARKER LOCATION
//             L.latLng(42.659, 27.736), // END YOU MARKER LOCATION
//           ],

//           geocoder: L.Control.Geocoder.nominatim(),
//           routeWhileDragging: true,
//           reverseWaypoints: true,
//           showAlternatives: true,

//           altLineOptions: {
//             styles: [
//               { color: 'black', opacity: 0.15, weight: 14 },
//               { color: 'white', opacity: 0.8, weight: 6 },
//               { color: 'blue', opacity: 0.5, weight: 2 },
//             ],
//           },
   
//         });

//         control.addTo(map);

//         const instructionsPanel = document.querySelector(
//           '.leaflet-routing-container'
 
//         );
//         if (instructionsPanel) {
//           instructionsPanel.style.display = 'none';
//         }

//         control.on('routeselected', (e) => {
//           const routeData = e.route; 
//           console.log('routeData', routeData.inputWaypoints);

  

//           const numberOfWaypoints = routeData.inputWaypoints.length;
//           const newData = Array.from(
//             { length: numberOfWaypoints },
//             (_, index) => `point${index + 1}`
//           );
//           setData(newData);
//           console.log('data', data);
//         });


//         mapRef.current = map; 
//       }
//     }

//     initmap();
//   }, []);

//   return (
//     <div>
//       <div id="youmap" style={{ height: '500px' }}></div>
//       <DataVisualization data={data} />
//     </div>
//   );
// }

// export default MapComponent;


//***************************
// That is my unsuccessfull approach to adapt my original code 
// for toolpad
//***************************

// import React, { useEffect, useRef, useState } from 'react';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import 'leaflet-routing-machine';
// import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import '../../node_modules/leaflet-control-geocoder/dist/Control.Geocoder.css';
// import '../../node_modules/leaflet-control-geocoder/dist/Control.Geocoder.js';
// import markerIcon from '../../node_modules/leaflet'; 
// //import DataVisualization from './DataVizualization';

// L.Marker.prototype.options.icon = L.icon({
//   iconUrl: markerIcon,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// interface MapComponentProps {
//   // Define any props needed for this component
// }

// function MapComponent(props: MapComponentProps) {
//      const root = useRef<HTMLDivElement | null>(null);
// //   const mapRef = useRef<L.Map | null>(null); 
//   const [data, setData] = useState<string[]>([]);

//   useEffect(() => {
//       function initmap() {
//           if (root.current) {
//     //   if (!mapRef.current) {
//         const map = L.map('youmap', {
//           center: [42.57, 27.523],
//           zoom: 13,
//         });

//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
//           map
//         );

//         const control = L.Routing.control({
//           waypoints: [
//             L.latLng(42.54, 27.453), // START YOU MARKER LOCATION
//             L.latLng(42.659, 27.736), // END YOU MARKER LOCATION
//           ],

//           geocoder: L.Control.Geocoder.nominatim(),
//           routeWhileDragging: true,
//           reverseWaypoints: true,
//           showAlternatives: true,

//           altLineOptions: {
//             styles: [
//               { color: 'black', opacity: 0.15, weight: 14 },
//               { color: 'white', opacity: 0.8, weight: 6 },
//               { color: 'blue', opacity: 0.5, weight: 2 },
//             ],
//           },
//         });

//         control.addTo(map);

//         const instructionsPanel = document.querySelector('.leaflet-routing-container');

//         if (instructionsPanel) {
//           instructionsPanel.style.display = 'none';
//         }

//         control.on('routeselected', (e) => {
//           const routeData = e.route;
//           console.log('routeData', routeData.inputWaypoints);

//           const numberOfWaypoints = routeData.inputWaypoints.length;
//           const newData = Array.from(
//             { length: numberOfWaypoints },
//             (_, index) => `point${index + 1}`
//           );
//           setData(newData);
//           console.log('data', newData); // Use newData instead of the previous state data
//         });

//         mapRef.current = map;
//       }
//     }

//     initmap();
//   }, []);

//   return (
//     <div>
//       <div id="youmap" style={{ height: '500px' }}></div>
//       {/* <DataVisualization data={data} /> */}
//     </div>
//   );
// }

// export default MapComponent;

// ********** that is the standart snippet ***********
//********** */

import * as React from "react";
import { Typography } from "@mui/material";
import { createComponent } from "@mui/toolpad/browser";
// import * as L from "https://esm.sh/leaflet";
import * as L from 'leaflet';

export interface LeafletTestProps {
  msg: string;
}

function LeafletTest({ msg }: LeafletTestProps) {
  return <Typography>{msg}</Typography>;
}

export default createComponent(LeafletTest, {
  argTypes: {
    msg: {
      type: "string",
      default: "Hello world!",
    },
  },
});