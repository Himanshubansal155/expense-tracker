import { call, put, takeEvery, all } from "redux-saga/effects";
import { showAllExpenses } from "../apiService/expense.api";
import { SHOW_ALL_EXPENSES } from "../constants/action.constants";
import { indexExpenses, loading, error } from "../Reducers/ExpenseReducer";
import toastService from "../services/toastService";

export function* indexAllExpenses(action) {
  try {
    yield put(loading());
    const response = yield call(showAllExpenses, action.payload.filters);
    yield put(indexExpenses(response));
    toastService.showtoast("Expenses Successfully");
  } catch (err) {
    toastService.showErrorToast(error.message);
    yield put(error(err));
  }
}
export function* watchExpenseChanged() {
  yield all([takeEvery(SHOW_ALL_EXPENSES, indexAllExpenses)]);
  yield;
}
