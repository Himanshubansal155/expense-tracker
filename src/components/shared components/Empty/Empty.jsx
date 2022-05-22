import React from "react";
import WorkOffIcon from "@mui/icons-material/WorkOff";

const Empty = ({ title }) => {
  return (
    <div className="flex flex-col justify-center items-center my-10">
      <WorkOffIcon className="text-5xl" />
      <div className="text-center">{title}</div>
    </div>
  );
};

export default Empty;
