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
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/Routes";
import Empty from "./../shared components/Empty/Empty";

const Expenses = () => {
  const [create, setCreate] = useState(false);
  const [editExpense, setEditExpense] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const expenses = useSelector(expenseStoreSelector);
  const [searchText, setSearchText] = useState(expenses.searchText);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchExpense = () => {
    navigate(ROUTES.EXPENSES);
    dispatch({
      type: SHOW_ALL_EXPENSES,
      payload: {
        filters: {
          title: searchText,
        },
      },
    });
  };
  useEffect(() => {
    if (searchText !== expenses.searchText) setSearchText(expenses.searchText);
  }, [expenses.searchText]);

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
      <div className="bg-gray-300 rounded-2xl px-2 p-1 text-gray-500 items-center mt-5 flex justify-between mx-5">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search Expense"
          autoComplete="off"
          onChange={(event) => setSearchText(event.target.value)}
          value={searchText}
          className="rounded-lg p-1 bg-transparent focus:outline-none text-gray-500 placeholder-gray-500 w-full"
        />
        <SearchIcon
          color="inherit"
          className="cursor-pointer"
          onClick={searchExpense}
        />
      </div>
      <div className="w-full flex justify-center">
        <div className="w-3/5 p-2 minhScreen">
          {expenses.expenses.length > 0 ? (
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
            ))
          ) : (
            <Empty title={"No Expenses Found"} />
          )}
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
