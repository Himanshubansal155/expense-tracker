import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expense: undefined,
  expenses: [],
  isLoading: false,
  error: undefined,
};

export const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    loading: (state) => {
      state.isLoading = true;
    },
    indexExpenses: (state, action) => {
      state.expenses = action.payload;
      state.isLoading = false;
    },
    getExpenseById: (state, action) => {
      state.expense = action.payload;
      state.isLoading = false;
    },
    error: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { loading, indexExpenses, error, getExpenseById } =
  expenseSlice.actions;

export default expenseSlice.reducer;
