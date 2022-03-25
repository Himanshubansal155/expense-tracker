import { createSlice } from "@reduxjs/toolkit";
import { LOGGED_IN, LOGGED_OUT } from "../constants/action.constants";

const initialState = {
  data: undefined,
  loginStatus: LOGGED_OUT,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
    },
    loginStart: (state) => {
      state.isLoading = true;
    },
    fetchCompleted: (state, action) => {
      const user = action.payload;
      state.loginStatus = LOGGED_IN;
      state.isLoading = false;
      state.data = user;
    },
    loginCompleted: (state, action) => {
      const user = action.payload;
      state.loginStatus = LOGGED_IN;
      state.isLoading = false;
      state.data = user;
    },
    loginError: (state, action) => {
      state.loginStatus = LOGGED_OUT;
      state.isLoading = false;
      state.error = action.payload.message;
    },
    logoutUser: (state) => {
      state.data = undefined;
      state.isLoading = false;
      state.loginStatus = LOGGED_OUT;
      state.error = undefined;
    },
  },
});

export const {
  loginCompleted,
  loginError,
  fetchCompleted,
  logoutUser,
  loginStart,
  fetchStart,
} = authSlice.actions;

export default authSlice.reducer;
