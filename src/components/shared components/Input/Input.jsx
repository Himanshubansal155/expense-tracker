import React from "react";
import { TextField } from "@mui/material";

const Input = (props) => {
  return (
    <>
      <TextField
        label={props.label || "Name"}
        variant={props.variant || "standard"}
        className="w-full"
        error={!!props.errorfield}
        {...props}
      />
      <p className="text-red-700 h-2 text-sm">{props.errorfield}</p>
    </>
  );
};

export default Input;
