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
    indexExpenses: (state, actions) => {
      state.expenses = actions.payload;
      state.isLoading = false;
    },
    error: (state, actions) => {
      state.error = actions.payload;
      state.isLoading = false;
    },
  },
});

export const { loading, indexExpenses, error } = expenseSlice.actions;

export default expenseSlice.reducer;
