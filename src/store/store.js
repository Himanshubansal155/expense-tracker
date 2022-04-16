import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Reducers/AuthReducer";
import CategoryReducer from "../Reducers/CategoryReducer";
import ExpenseReducer from "../Reducers/ExpenseReducer";
import rootSaga, { sagaMiddleware } from "../saga";

export default configureStore({
  reducer: {
    user: AuthReducer,
    expense: ExpenseReducer,
    category: CategoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
