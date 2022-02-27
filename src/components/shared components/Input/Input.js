import React from "react";
import { TextField } from "@mui/material";

const Input = (props) => {
  return (
    <TextField
      label={props.label || "Name"}
      variant={props.variant || "standard"}
      className="w-full"
      {...props}
    />
  );
};

export default Input;
