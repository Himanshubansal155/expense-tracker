import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  showAllExpensesApi,
  showYearlyExpenses,
} from "../apiService/expense.api";
import {
  SHOW_ALL_MONTHLY_EXPENSES,
  SHOW_ALL_RECIEPT_EXPENSES,
  SHOW_ALL_YEARLY_EXPENSES,
} from "../constants/action.constants";
import {
  indexMonthlyExpenses,
  indexRecieptExpenses,
  indexYearlyExpenses,
  monthlyError,
  monthlyLoading,
  recieptError,
  recieptLoading,
  yearlyError,
  yearlyLoading,
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
export function* indexAllRecieptExpenses(action) {
  try {
    yield put(recieptLoading());
    const response = yield call(showAllExpensesApi, action.payload?.filters);
    yield put(indexRecieptExpenses(response));
  } catch (err) {
    toastService.showErrorToast(err.message);
    yield put(recieptError(err));
  }
}

export function* indexAllYearlyExpenses(action) {
  try {
    yield put(yearlyLoading());
    const response = yield call(showYearlyExpenses, action.payload?.year);
    yield put(indexYearlyExpenses(response));
  } catch (err) {
    toastService.showErrorToast(err.message);
    yield put(yearlyError(err));
  }
}

export function* watchReportsChanged() {
  yield all([takeEvery(SHOW_ALL_MONTHLY_EXPENSES, indexAllMonthlyExpenses)]);
  yield all([takeEvery(SHOW_ALL_YEARLY_EXPENSES, indexAllYearlyExpenses)]);
  yield all([takeEvery(SHOW_ALL_RECIEPT_EXPENSES, indexAllRecieptExpenses)]);
  yield;
}
