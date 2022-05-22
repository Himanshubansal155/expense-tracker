import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_ALL_RECIEPT_EXPENSES } from "../../constants/action.constants";
import { reportStoreSelector } from "../../store/stores.selector";
import ButtonField from "../shared components/Button/Button";
import Loader from "../shared components/Loader/Loader";
import PDFDocument from "../shared components/PDFDocument/PDFDocument";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(1, "month"));
  const reportStore = useSelector(reportStoreSelector);
  useEffect(() => {
    if (!reportStore.isRecieptExpensesLoaded) handleRecieptChange();
  }, []);
  const dispatch = useDispatch();
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
      <div className="my-10">
        <div className="text-3xl text-primary text-center p-10">
          Create Reports
        </div>
        <div className="flex justify-center items-center space-x-4">
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
