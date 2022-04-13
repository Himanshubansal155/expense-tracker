import React from "react";
import { useSelector } from "react-redux";
import Loader from "../shared components/Loader/Loader";

const Expenses = () => {
  const expenses = useSelector((state) => state?.expense);
  if (expenses.isLoading) {
    return <Loader />;
  }
  return <div>Expenses</div>;
};

export default Expenses;
