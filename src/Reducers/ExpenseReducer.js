import { createSlice } from "@reduxjs/toolkit";
import { sortArray } from "../Utils";

const initialState = {
  expense: undefined,
  expenses: [],
  isLoading: false,
  error: undefined,
  filterParams: {},
};

export const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    loading: (state) => {
      state.isLoading = true;
      state.error = undefined;
    },
    indexExpenses: (state, action) => {
      state.expenses = action.payload;
      state.isLoading = false;
    },
    getExpenseById: (state, action) => {
      state.expense = action.payload;
      state.isLoading = false;
    },
    deleteExpenseFromExpenses: (state, action) => {
      state.expenses = state.expenses.splice(action.payload, 1);
      state.expense = undefined;
      state.isLoading = false;
    },
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
      state.expenses = sortArray(state.expenses);
      state.isLoading = false;
    },
    error: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  loading,
  indexExpenses,
  error,
  getExpenseById,
  deleteExpenseFromExpenses,
  addExpense,
} = expenseSlice.actions;

export default expenseSlice.reducer;
