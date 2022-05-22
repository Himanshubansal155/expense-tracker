import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VictoryLabel, VictoryPie, VictoryTheme } from "victory";
import { SHOW_ALL_RECIEPT_EXPENSES } from "../../constants/action.constants";
import { reportStoreSelector } from "../../store/stores.selector";
import ButtonField from "../shared components/Button/Button";
import { map, uniqBy } from "lodash";

const CategoryPie = () => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(1, "month"));
  const reportStore = useSelector(reportStoreSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!reportStore.isRecieptExpensesLoaded) handleRecieptChange();
  }, []);
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
  const expenses = reportStore.recieptExpenses;
  const amountList = [];
  const categoriesList = uniqBy(map(expenses, "category"), "id");
  const dataList = categoriesList.map((category, index) => {
    amountList[index] = 0;
    expenses.map((expense) => {
      if (expense.category.title === category.title) {
        amountList[index] = amountList[index] + expense.amount;
      }
      return expense;
    });
    return { x: category.title, y: amountList[index], id: category.id };
  });
  console.log(dataList);
  return (
    <div style={{ width: 550, margin: "auto" }} className="p-10">
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => {
            setEndDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </div>
      <ButtonField className="mt-5" onClick={handleRecieptChange}>
        Create
      </ButtonField>
      <svg viewBox="0 0 320 320">
        <VictoryPie
          standalone={false}
          data={dataList}
          innerRadius={50}
          theme={VictoryTheme.material}
          labelRadius={({ innerRadius }) => innerRadius + 14}
          labelComponent={
            <VictoryLabel
              angle={0}
              style={[
                {
                  fontSize: "11px",
                  fill: "#0f0f0f",
                },
                {
                  fontSize: "10px",
                  fill: "#013157",
                },
              ]}
              text={({ datum }) => `${datum.x}\n $${datum.y}`}
            />
          }
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 14, fill: "#8b8b8b" }}
          x={175}
          y={170}
          text={`Spent \nper category`}
        />
      </svg>
    </div>
  );
};

export default CategoryPie;
