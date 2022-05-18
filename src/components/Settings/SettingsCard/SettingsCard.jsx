import { Collapse } from "@mui/material";
import React, { useState } from "react";

const SettingsCard = ({ title, children }) => {
  const [collapse, setCollapse] = useState(false);
  return (
    <div>
      <div
        className="shadow-lg p-10 cursor-pointer"
        onClick={() => setCollapse(!collapse)}
      >
        <div>{title}</div>
      </div>

      <Collapse in={collapse}>
        <div className="p-5 flex">{children}</div>
      </Collapse>
    </div>
  );
};

export default SettingsCard;
