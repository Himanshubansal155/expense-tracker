import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Reducers/AuthReducer";
import rootSaga, { sagaMiddleware } from "../saga";
import counterReducer from "./../Reducers/CounterSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: AuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);