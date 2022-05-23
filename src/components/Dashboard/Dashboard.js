import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SHOW_ALL_EXPENSES,
  SHOW_ALL_RECIEPT_EXPENSES,
  SHOW_ALL_YEARLY_EXPENSES,
} from "../../constants/action.constants";
import {
  expenseStoreSelector,
  reportStoreSelector,
} from "../../store/stores.selector";
import ButtonField from "../shared components/Button/Button";
import Loader from "../shared components/Loader/Loader";
import PDFDocument from "../shared components/PDFDocument/PDFDocument";
import SearchIcon from "@mui/icons-material/Search";
import { ROUTES } from "../../constants/Routes";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(1, "month"));
  const reportStore = useSelector(reportStoreSelector);
  const expenseStore = useSelector(expenseStoreSelector);
  const [searchText, setSearchText] = useState(expenseStore.searchText);
  const yearlyList = reportStore?.yearlyExpenses;
  const thisMonth = moment().month();
  useEffect(() => {
    if (!reportStore.isRecieptExpensesLoaded) handleRecieptChange();
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (searchText !== expenseStore.searchText)
      setSearchText(expenseStore.searchText);
  }, [expenseStore.searchText]);
  useEffect(() => {
    dispatch({
      type: SHOW_ALL_YEARLY_EXPENSES,
      payload: {
        year: moment().year(),
      },
    });
  }, []);

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
  const handleRecieptChange = () => {
    if (startDate && endDate) {
      const start = moment(startDate);
      const end = moment(endDate);
      dispatch({
        type: SHOW_ALL_RECIEPT_EXPENSES,
        payload: {
          filters: {
            startDate: start.toString(),
            endDate: end.toString(),
          },
        },
      });
    }
  };
  return (
    <div>
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
      <div className="border border-gray-100 p-10 shadow-xl w-10/12 md:w-8/12 mx-auto mt-3">
        <div className="text-center text-4xl text-darkPrimary">
          You've spent
        </div>
        <div className="flex justify-center flex-col md:flex-row items-center">
          <div className="rounded-full w-48 lg:w-72 h-48 lg:h-72 shadow-2xl bg-darkPrimary">
            <div className="rounded-full w-full h-full border-8 border-primary p-10 flex flex-col justify-center items-center">
              {reportStore.isYearlyLoading ? (
                <Loader />
              ) : (
                <>
                  <div className="text-xl lg:text-3xl text-white mb-5">
                    Rs.
                    {yearlyList?.monthlyExpenses?.length > 0 &&
                      yearlyList?.monthlyExpenses[thisMonth]}
                  </div>
                  <div className="text-lg md:text-xl text-gray-200">
                    This month
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-48 sm:w-60 md:ml-10 mt-10">
            <div className="px-1 p-2 border-4 border-primary italic rounded-lg w-full text-center text-primary">
              Rs. 200 today
            </div>
            <div className="px-1 p-2 border-4 border-primary italic rounded-lg w-full mt-2 text-center text-primary">
              Rs. 102 Yesterday
            </div>
            <div className="w-full text-left text-primary">
              <span
                className="cursor-pointer"
                onClick={() => navigate(ROUTES.EXPENSES)}
              >
                See more
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="my-10">
        <div className="text-3xl text-primary text-center p-10">
          Create Reports
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </div>
        {reportStore.isRecieptLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-col justify-center items-center mt-5">
            <ButtonField onClick={handleRecieptChange}>Create</ButtonField>
            <PDFDocument
              expenses={reportStore.recieptExpenses}
              message={`Expenses from ${moment(startDate).format(
                "DD/MM/YYYY"
              )} - ${moment(endDate).format("DD/MM/YYYY")}`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
