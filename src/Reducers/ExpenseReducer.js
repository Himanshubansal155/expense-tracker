import { createSlice } from "@reduxjs/toolkit";
import { sortArray } from "../Utils";

const initialState = {
  expense: undefined,
  expenses: [],
  isLoading: false,
  isExpenseLoading: false,
  error: undefined,
  filterParams: {},
  isExpensesLoaded: false,
  searchText: "",
};

export const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    loading: (state) => {
      state.isLoading = true;
      state.error = undefined;
    },
    isExpenseLoading: (state) => {
      state.isExpenseLoading = true;
      state.error = undefined;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    indexExpenses: (state, action) => {
      state.expenses = action.payload;
      state.isLoading = false;
      state.isExpensesLoaded = true;
    },
    getExpenseById: (state, action) => {
      state.expense = action.payload;
      state.isExpenseLoading = false;
      state.expenses[
        state.expenses.findIndex((e) => e.id === action.payload.id)
      ] = action.payload;
    },
    deleteExpenseFromExpenses: (state, action) => {
      state.expenses.splice(action.payload, 1);
      state.expense = undefined;
      state.isLoading = false;
    },
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
      state.expenses = sortArray(state.expenses);
      state.isExpenseLoading = false;
    },
    error: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isExpenseLoading = false;
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
  isExpenseLoading,
  setSearchText,
} = expenseSlice.actions;

export default expenseSlice.reducer;
