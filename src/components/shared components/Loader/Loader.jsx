import React from "react";
import { MutatingDots } from "react-loader-spinner";
import { COLORS } from "./../../../constants/Colors";

const Loader = ({ className }) => {
  return (
    <div className={"flex mt-10 flex-col items-center w-full " + className}>
      <MutatingDots
        ariaLabel="loading-indicator"
        secondaryColor={COLORS.primary}
        color={COLORS.darkPrimary}
      />
      <span className="animate-ping">Loading</span>
    </div>
  );
};

export default Loader;
