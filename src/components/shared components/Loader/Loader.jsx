import React from "react";
import { MutatingDots } from "react-loader-spinner";
import { COLORS } from "./../../../constants/Colors";

const Loader = ({ className }) => {
  return (
    <div className={"flex w-full justify-center " + className}>
      <MutatingDots
        ariaLabel="loading-indicator"
        secondaryColor={COLORS.primary}
        color={COLORS.darkPrimary}
      />
    </div>
  );
};

export default Loader;
