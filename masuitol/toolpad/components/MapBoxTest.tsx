import * as React from "react";
import { Typography } from "@mui/material";
import { createComponent } from "@mui/toolpad/browser";

export interface MapBoxTestProps {
  msg: string;
}

function MapBoxTest({ msg }: MapBoxTestProps) {
  return <Typography>{msg}</Typography>;
}

export default createComponent(MapBoxTest, {
  argTypes: {
    msg: {
      type: "string",
      default: "Hello world!",
    },
  },
});
