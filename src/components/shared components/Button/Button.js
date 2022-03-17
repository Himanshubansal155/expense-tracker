import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const ButtonField = (props) => {
  const BootstrapButton = styled(Button)({
    ...props.buttonStyle,
    "&:hover": props.hoverStyle,
  });
  return (
    <div>
      <BootstrapButton variant={props.variant || "contained"} {...props}>
        {props.children}
      </BootstrapButton>
    </div>
  );
};

export default ButtonField;
