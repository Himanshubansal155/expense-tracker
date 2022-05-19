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
    loading: (state) => {
      state.isLoading = true;
    },
    fetchCompleted: (state, action) => {
      const user = action.payload;
      state.loginStatus = LOGGED_IN;
      state.isLoading = false;
      state.data = user;
      state.error = undefined;
    },
    updateCompleted: (state, action) => {
      const user = action.payload;
      state.isLoading = false;
      state.data = user;
      state.error = undefined;
    },
    loginCompleted: (state, action) => {
      const user = action.payload;
      state.loginStatus = LOGGED_IN;
      state.isLoading = false;
      state.data = user;
      state.error = undefined;
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
  loading,
  updateCompleted,
} = authSlice.actions;

export default authSlice.reducer;
