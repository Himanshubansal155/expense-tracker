import React from "react";
import FmdBadIcon from "@mui/icons-material/FmdBad";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center mt-20 text-gray-500 animate-bounce">
      <FmdBadIcon className="text-9xl" />
      <span className="text-4xl text-center mt-3">
        404 <br /> Not Found
      </span>
    </div>
  );
};

export default NotFoundPage;
