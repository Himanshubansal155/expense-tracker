import React from "react";
import Popover from "@mui/material/Popover";

const PopOver = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <button onClick={handleClick}>
        {props.buttonchild || "click"}
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        {...props}
      >
        {props.children}
      </Popover>
    </>
  );
};

export default PopOver;
