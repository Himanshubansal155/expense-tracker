import { Popover } from "@mui/material";
import React from "react";
import ErrorIcon from "@mui/icons-material/Error";

const Delete = ({ handleClose, anchorEl, deleteText, handleSubmit }) => {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      className="popover"
    >
      <div className="p-4 rounded-full overflow-hidden">
        <ErrorIcon className="text-yellow-400 mr-2" />
        {deleteText ? deleteText : "Are you sure, you want to delete?"}
        <div className="flex justify-end mt-2 space-x-4">
          <span
            className="p-1 cursor-pointer border border-gray-400 px-2 text-gray-400 rounded-md"
            onClick={handleClose}
          >
            No
          </span>
          <span
            className="text-white border px-2 border-gray-400 bg-darkPrimary p-1 cursor-pointer rounded-md"
            onClick={handleSubmit}
          >
            Yes
          </span>
        </div>
      </div>
    </Popover>
  );
};

export default Delete;
