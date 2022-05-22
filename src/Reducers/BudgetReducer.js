import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  monthlyExpenses: [],
  yearlyExpenses: [],
  isMonthlyLoading: false,
  recieptExpenses: [],
  isRecieptLoading: false,
  isYearlyLoading: false,
  monthlyError: undefined,
  recieptError: undefined,
  yearlyError: undefined,
  filterParams: {},
  isMonthlyExpensesLoaded: false,
  isYearlyExpensesLoaded: false,
  isRecieptExpensesLoaded: false,
};

export const budgetSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    monthlyLoading: (state) => {
      state.isMonthlyLoading = true;
      state.monthlyError = undefined;
    },
    yearlyLoading: (state) => {
      state.isYearlyLoading = true;
      state.yearlyError = undefined;
    },
    recieptLoading: (state) => {
      state.isRecieptLoading = true;
      state.recieptError = undefined;
    },
    indexMonthlyExpenses: (state, action) => {
      state.monthlyExpenses = action.payload;
      state.isMonthlyLoading = false;
      state.isMonthlyExpensesLoaded = true;
    },
    indexRecieptExpenses: (state, action) => {
      state.recieptExpenses = action.payload;
      state.isRecieptLoading = false;
      state.isRecieptExpensesLoaded = true;
    },
    monthlyError: (state, action) => {
      state.monthlyError = action.payload;
      state.isMonthlyLoading = false;
    },
    recieptError: (state, action) => {
      state.recieptError = action.payload;
      state.isRecieptLoading = false;
    },
    indexYearlyExpenses: (state, action) => {
      state.yearlyExpenses = action.payload;
      state.isYearlyLoading = false;
      state.isYearlyExpensesLoaded = true;
    },
    yearlyError: (state, action) => {
      state.yearlyError = action.payload;
      state.isYearlyLoading = false;
    },
  },
});

export const {
  monthlyLoading,
  yearlyLoading,
  indexMonthlyExpenses,
  monthlyError,
  indexYearlyExpenses,
  yearlyError,
  recieptError,
  recieptLoading,
  indexRecieptExpenses,
} = budgetSlice.actions;

export default budgetSlice.reducer;
