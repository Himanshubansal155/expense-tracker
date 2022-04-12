import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { watchLoginUserChanged } from "./auth.saga";
import { watchExpenseChanged } from "./expense.saga";
export const sagaMiddleware = createSagaMiddleware();

export default function* rootSaga() {
  yield all([watchLoginUserChanged(), watchExpenseChanged()]);
}
