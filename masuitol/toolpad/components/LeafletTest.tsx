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






