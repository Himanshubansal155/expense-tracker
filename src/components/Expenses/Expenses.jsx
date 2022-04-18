import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../shared components/Loader/Loader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateExpense from "./CreateExpense/CreateExpense";

const Expenses = () => {
  const [create, setCreate] = useState(false);
  const expenses = useSelector((state) => state?.expense);
  if (expenses.isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="flex justify-between items-center border-b-2 px-3 pt-4 pb-3">
        <span>Expenses</span>
        <AddCircleOutlineIcon
          className="text-primary text-3xl cursor-pointer mr-5"
          onClick={() => setCreate(true)}
        />
      </div>
      {create && (
        <CreateExpense create={create} handleClose={() => setCreate(false)} />
      )}
    </div>
  );
};

export default Expenses;
