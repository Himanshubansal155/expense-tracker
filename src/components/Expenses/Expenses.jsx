import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../shared components/Loader/Loader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateExpense from "./CreateExpense/CreateExpense";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "../shared components/Delete/Delete";
import {
  DELETE_EXPENSE,
  SHOW_ALL_EXPENSES,
} from "../../constants/action.constants";
import { expenseStoreSelector } from "../../store/stores.selector";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import { convert } from "../../apiService/image.api";

const Expenses = () => {
  const [create, setCreate] = useState(false);
  const [editExpense, setEditExpense] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const expenses = useSelector(expenseStoreSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!expenses.isExpensesLoaded) {
      dispatch({ type: SHOW_ALL_EXPENSES });
    }
  }, []);
  if (expenses.isLoading) {
    return <Loader />;
  }
  const handleClick = (event, id) => {
    setDeleteId(id);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setDeleteId(null);
    setAnchorEl(null);
  };
  const handleDeleteExpense = () => {
    dispatch({ type: DELETE_EXPENSE, payload: { id: deleteId } });
    handleClose();
  };
  async function download(source, fileName) {
    await axios
      .get(source, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
        responseType: "blob",
      })
      .then(async (response) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(response.data);
        link.download = fileName;
        link.click();
      })
      .catch(console.error);
  }
  const handleDownload = (meta) => {
    download(
      meta.url,
      `${Math.floor(Math.random() * 10000000000)}.${meta.type}`
    );
  };
  return (
    <div>
      <div className="flex justify-between items-center border-b-2 px-3 pt-4 pb-3">
        <span>Expenses</span>
        <AddCircleOutlineIcon
          className="text-primary text-3xl cursor-pointer mr-5"
          onClick={() => setCreate(true)}
        />
      </div>
      <div className="w-full flex justify-center">
        <div className="w-3/5 border-r border-gray-200 p-2 minhScreen">
          {expenses.expenses.length > 0 &&
            expenses.expenses.map((expense, index) => (
              <div
                className="w-full hover:bg-gray-200 border border-gray-200 p-2 rounded-xl mt-2"
                key={index}
              >
                <div className="flex justify-between items-center">
                  <span className="text-2xl">{expense.title}</span>
                  <span>Rs.{expense.amount}</span>
                </div>
                <div className="text-sm text-gray-400">
                  {expense.description}
                </div>
                <div className="flex justify-between space-x-3 items-center">
                  <div className="flex space-x-2 mt-2">
                    <div
                      className="px-3 text-sm py-1 bg-gray-50 border border-gray-200 max-w-min rounded-full"
                      key={index}
                    >
                      {expense?.category?.title}
                    </div>
                  </div>
                  <div className="flex space-x-3 text-darkPrimary py-1">
                    {expense.meta && (
                      <DownloadIcon
                        className="cursor-pointer"
                        onClick={() => handleDownload(expense?.meta)}
                      />
                    )}
                    <EditIcon
                      className="cursor-pointer"
                      onClick={() => setEditExpense(expense)}
                    />
                    <DeleteIcon
                      className="cursor-pointer"
                      onClick={(event) => handleClick(event, expense.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {create && (
        <CreateExpense create={create} handleClose={() => setCreate(false)} />
      )}
      {!!editExpense && (
        <CreateExpense
          create={!!editExpense}
          handleClose={() => setEditExpense(null)}
          expense={editExpense}
        />
      )}

      <Delete
        handleClose={handleClose}
        handleSubmit={handleDeleteExpense}
        anchorEl={anchorEl}
      />
    </div>
  );
};

export default Expenses;
