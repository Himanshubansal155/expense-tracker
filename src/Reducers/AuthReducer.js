import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: undefined,
};

export const authSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    fetchCompleted: (state, action) => {
      const user = action.payload;
      state.data = user;
    },
    loginCompleted: (state, action) => {
      const user = action.payload;
      state.data = user;
    },
    loginError: (state, action) => {
      state.error = action.payload.message;
    },
  },
});

export const { loginCompleted, loginError, fetchCompleted } = authSlice.actions;

export default authSlice.reducer;
