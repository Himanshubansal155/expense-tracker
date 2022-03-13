import { createSlice } from "@reduxjs/toolkit";
import { LOGGED_IN, LOGGED_OUT } from "../constants/action.constants";

const initialState = {
  data: undefined,
  loginStatus: LOGGED_OUT,
};

export const authSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    fetchCompleted: (state, action) => {
      const user = action.payload;
      state.loginStatus = LOGGED_IN;
      state.data = user;
    },
    loginCompleted: (state, action) => {
      const user = action.payload;
      state.loginStatus = LOGGED_IN;
      state.data = user;
    },
    loginError: (state, action) => {
      state.loginStatus = LOGGED_OUT;
      state.error = action.payload.message;
    },
  },
});

export const { loginCompleted, loginError, fetchCompleted } = authSlice.actions;

export default authSlice.reducer;
