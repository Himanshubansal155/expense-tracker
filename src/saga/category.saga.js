import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  addCategoryApi,
  deleteCategoryApi,
  editCategoryApi,
  showAllCategoriesApi,
} from "../apiService/category.api";
import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  SHOW_ALL_CATEGORIES,
  UPDATE_CATEGORY,
} from "../constants/action.constants";
import {
  addCategory,
  deleteCategoryFromCategories,
  error,
  getCategoryById,
  indexCategories,
  loading,
} from "../Reducers/CategoryReducer";
import toastService from "../services/toastService";

export function* indexAllCategories(action) {
  try {
    yield put(loading());
    const response = yield call(showAllCategoriesApi, action.payload?.filters);
    yield put(indexCategories(response));
  } catch (err) {
    toastService.showErrorToast(err.message);
    yield put(error(err));
  }
}

export function* updateCategory(action) {
  try {
    yield put(loading());
    const response = yield call(
      editCategoryApi,
      action.payload.id,
      action.payload.data
    );
    yield put(getCategoryById(response));
  } catch (err) {
    toastService.showErrorToast(err.message);
    yield put(error(err));
  }
}

export function* deleteUserCategory(action) {
  try {
    yield put(loading());
    yield call(deleteCategoryApi, action.payload.id);
    yield put(deleteCategoryFromCategories(action.payload.index));
  } catch (err) {
    toastService.showErrorToast(err.message);
    yield put(error(err));
  }
}

export function* addUserCategory(action) {
  try {
    yield put(loading());
    const response = yield call(addCategoryApi, action.payload);
    yield put(addCategory(response));
  } catch (err) {
    toastService.showErrorToast(err.message);
    yield put(error(err));
  }
}

export function* watchCategoryChanged() {
  yield all([takeEvery(SHOW_ALL_CATEGORIES, indexAllCategories)]);
  yield all([takeEvery(UPDATE_CATEGORY, updateCategory)]);
  yield all([takeEvery(DELETE_CATEGORY, deleteUserCategory)]);
  yield all([takeEvery(ADD_CATEGORY, addUserCategory)]);
  yield;
}
