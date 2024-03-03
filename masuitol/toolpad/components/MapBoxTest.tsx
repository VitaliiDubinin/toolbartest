
import React from 'react';
import MapBoxComponent from "./MapBoxComponent";
import { createComponent } from "@mui/toolpad/browser";

export interface MapBoxTestProps {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  zoom: number;
}

function MapBoxTest({ startLat, startLng, endLat, endLng, zoom }: MapBoxTestProps) {
  return <MapBoxComponent startLat={startLat} startLng={startLng} endLat={endLat} endLng={endLng} zoom={zoom} />;
}

export default createComponent(MapBoxTest, {
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