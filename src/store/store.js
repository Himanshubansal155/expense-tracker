import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Reducers/AuthReducer";
import BudgetReducer from "../Reducers/BudgetReducer";
import CategoryReducer from "../Reducers/CategoryReducer";
import ExpenseReducer from "../Reducers/ExpenseReducer";
import rootSaga, { sagaMiddleware } from "../saga";

export default configureStore({
  reducer: {
    user: AuthReducer,
    expense: ExpenseReducer,
    category: CategoryReducer,
    report: BudgetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
