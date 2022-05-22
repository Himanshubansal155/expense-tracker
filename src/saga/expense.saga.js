import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  addExpenseApi,
  deleteExpenseApi,
  editExpenseApi,
  showAllExpensesApi,
} from "../apiService/expense.api";
import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  GET_EXPENSE,
  SHOW_ALL_EXPENSES,
  UPDATE_EXPENSE,
} from "../constants/action.constants";
import { resetCategoryItems } from "../Reducers/CategoryReducer";
import {
  indexExpenses,
  loading,
  error,
  getExpenseById,
  deleteExpenseFromExpenses,
  addExpense,
  isExpenseLoading,
  setSearchText,
} from "../Reducers/ExpenseReducer";
import toastService from "../services/toastService";

export function* indexAllExpenses(action) {
  try {
    yield put(loading());
    yield put(setSearchText(action.payload?.filters?.title));
    const response = yield call(showAllExpensesApi, action.payload?.filters);
    yield put(indexExpenses(response));
  } catch (err) {
    toastService.showErrorToast(err.message);
    yield put(error(err));
  }
}
export function* getExpense(action) {
  try {
    yield put(loading());
    const response = yield call(showAllExpensesApi, action.payload.id);
    yield put(getExpenseById(response));
  } catch (err) {
    toastService.showErrorToast(err.message);
    yield put(error(err));
  }
}

export function* updateExpense(action) {
  try {
    yield put(isExpenseLoading());
    yield put(resetCategoryItems());
    const response = yield call(
      editExpenseApi,
      action.payload.id,
      action.payload.data
    );
    toastService.showtoast("Expense Updated Successfully");
    action.payload.onClose();
    yield put(getExpenseById(response));
  } catch (err) {
    toastService.showErrorToast(err.message);
    yield put(error(err));
  }
}

export function* deleteUserExpense(action) {
  try {
    yield put(loading());
    yield put(resetCategoryItems());
    yield call(deleteExpenseApi, action.payload.id);
    yield put(deleteExpenseFromExpenses(action.payload.index));
    toastService.showtoast("Expense Deleted Successfully");
  } catch (err) {
    toastService.showErrorToast(err.message);
    yield put(error(err));
  }
}

export function* addUserExpense(action) {
  try {
    yield put(isExpenseLoading());
    yield put(resetCategoryItems());
    const response = yield call(addExpenseApi, action.payload.data);
    toastService.showtoast("Expense Created Successfully");
    action.payload.onClose();
    yield put(addExpense(response));
  } catch (err) {
    toastService.showErrorToast(err.message);
    yield put(error(err));
  }
}

export function* watchExpenseChanged() {
  yield all([takeEvery(SHOW_ALL_EXPENSES, indexAllExpenses)]);
  yield all([takeEvery(GET_EXPENSE, getExpense)]);
  yield all([takeEvery(UPDATE_EXPENSE, updateExpense)]);
  yield all([takeEvery(DELETE_EXPENSE, deleteUserExpense)]);
  yield all([takeEvery(ADD_EXPENSE, addUserExpense)]);
  yield;
}
