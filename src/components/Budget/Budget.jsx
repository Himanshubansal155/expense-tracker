import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_ALL_MONTHLY_EXPENSES } from "../../constants/action.constants";
import { reportStoreSelector } from "../../store/stores.selector";
import Empty from "../shared components/Empty/Empty";
import Input from "../shared components/Input/Input";
import Loader from "../shared components/Loader/Loader";
import VictoryMonthlyChart from "./VictoryMonthlyChart/VictoryMonthlyChart";
import YearlyBar from "./YearlyBar/YearlyBar";

const Budget = () => {
  const dispatch = useDispatch();
  const reports = useSelector(reportStoreSelector);
  const [month, setMonth] = useState(moment().format("YYYY-MM"));
  const [year, setYear] = useState(moment().format("YYYY"));

  console.log(year);

  useEffect(() => {
    handleMonthChange();
  }, [month]);
  const handleMonthChange = () => {
    if (month) {
      const date = moment(month);
      dispatch({
        type: SHOW_ALL_MONTHLY_EXPENSES,
        payload: {
          filters: {
            startDate: date.startOf("month").toString(),
            endDate: date.endOf("month").toString(),
          },
        },
      });
    }
  };
  const expensesList = reports.monthlyExpenses;
  return (
    <div className="min-h-screen mt-10">
      {reports.isMonthlyLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-center w-1/2 mx-auto space-x-5 items-center">
            <span>Expenses Scattered Over</span>
            <Input
              type="month"
              label="Month"
              className={`mt-2 w-full ${!month && "month"}`}
              onChange={(event) => setMonth(event.target.value)}
              value={month}
            />
          </div>
          {expensesList.length > 0 && !!month ? (
            <div className=" height">
              <div className="w-5/6 h-4/6 mx-auto ">
                <VictoryMonthlyChart expenses={expensesList} />
              </div>
            </div>
          ) : (
            <Empty title={"No Expenses Found"} />
          )}
        </>
      )}

      <div className="flex justify-center w-1/2 mx-auto space-x-5 items-center">
        <span>Your monthly expenditures in</span>
        <DatePicker
          views={["year"]}
          label="Year only"
          value={year}
          onChange={(newValue) => {
            setYear(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </div>
      <div className="h-screen">
        <div className="w-5/6 h-4/6 mx-auto ">
          <YearlyBar />
        </div>
      </div>
    </div>
  );
};

export default Budget;