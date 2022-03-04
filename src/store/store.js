import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Reducers/AuthReducer";
import counterReducer from "./../Reducers/CounterSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: AuthReducer,
  },
});
