import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  monthlyExpenses: [],
  yearlyExpenses: [],
  isMonthlyLoading: false,
  isYearlyLoading: false,
  monthlyError: undefined,
  yearlyError: undefined,
  filterParams: {},
  isMonthlyExpensesLoaded: false,
  isYearlyExpensesLoaded: false,
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
    indexMonthlyExpenses: (state, action) => {
      state.monthlyExpenses = action.payload;
      state.isMonthlyLoading = false;
      state.isMonthlyExpensesLoaded = true;
    },
    monthlyError: (state, action) => {
      state.monthlyError = action.payload;
      state.isMonthlyLoading = false;
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
} = budgetSlice.actions;

export default budgetSlice.reducer;
