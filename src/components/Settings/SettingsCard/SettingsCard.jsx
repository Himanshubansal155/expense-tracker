import { Collapse } from "@mui/material";
import React, { useState } from "react";

const SettingsCard = ({ title, subTitle, children }) => {
  const [collapse, setCollapse] = useState(false);
  return (
    <div>
      <div
        className="shadow-lg p-10 cursor-pointer flex justify-between border border-gray-200"
        onClick={() => setCollapse(!collapse)}
      >
        <div>{title}</div>
        <div>{subTitle}</div>
      </div>

      <Collapse in={collapse}>
        <div className="p-5 flex border border-gray-100 border-t-0">
          {children}
        </div>
      </Collapse>
    </div>
  );
};

export default SettingsCard;
