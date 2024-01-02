import * as React from "react";
import { Typography } from "@mui/material";
import { createComponent } from "@mui/toolpad/browser";

export interface pageRow2Props {
  msg: string;
}

function pageRow2({ msg }: pageRow2Props) {
  return <Typography>{msg}</Typography>;
}

export default createComponent(pageRow2, {
  argTypes: {
    msg: {
      type: "string",
      default: "Hello world!",
    },
  },
});
