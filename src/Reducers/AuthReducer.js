import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: undefined,
};

export const authSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    fetchCompleted: (state, action) => {
      const userId = action.payload.id;
      state.id = userId;
    },
    loginCompleted: (state, action) => {
      const userId = action.payload.id;
      state.id = userId;
    },
    loginError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { loginCompleted, loginError, fetchCompleted } = authSlice.actions;

export default authSlice.reducer;
