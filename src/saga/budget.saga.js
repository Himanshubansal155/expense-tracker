import { call, put, takeEvery, all } from "redux-saga/effects";
import { showAllExpensesApi } from "../apiService/expense.api";
import { SHOW_ALL_MONTHLY_EXPENSES, SHOW_ALL_YEARLY_EXPENSES } from "../constants/action.constants";
import {
  indexMonthlyExpenses,
  monthlyError,
  monthlyLoading,
} from "../Reducers/BudgetReducer";
import toastService from "../services/toastService";

export function* indexAllMonthlyExpenses(action) {
  try {
    yield put(monthlyLoading());
    const response = yield call(showAllExpensesApi, action.payload?.filters);
    yield put(indexMonthlyExpenses(response));
  } catch (err) {
    toastService.showErrorToast(err.message);
    yield put(monthlyError(err));
  }
}

export function* indexAllYearlyExpenses(action) {
  try {
    yield put(monthlyLoading());
    const response = yield call(showAllExpensesApi, action.payload?.filters);
    yield put(indexMonthlyExpenses(response));
  } catch (err) {
    toastService.showErrorToast(err.message);
    yield put(monthlyError(err));
  }
}

export function* watchReportsChanged() {
  yield all([takeEvery(SHOW_ALL_MONTHLY_EXPENSES, indexAllMonthlyExpenses)]);
  yield all([takeEvery(SHOW_ALL_YEARLY_EXPENSES, indexAllMonthlyExpenses)]);
  yield;
}