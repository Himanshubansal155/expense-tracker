import React from "react";
import { Button } from "@mui/material";

const ButtonField = (props) => {
  return (
    <div>
      <Button variant={props.variant || "contained"} {...props}>
        {props.children}
      </Button>
    </div>
  );
};

export default ButtonField;
