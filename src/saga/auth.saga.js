import { call, put, takeEvery, all } from "redux-saga/effects";
import { login, logout, me } from "../apiService/Auth.api";
import { ME_FETCH, ME_LOGIN, ME_LOGOUT } from "../constants/action.constants";
import {
  fetchCompleted,
  loginCompleted,
  loginError,
  logoutUser,
} from "../Reducers/AuthReducer";
import toastService from "../services/toastService";

export function* addUser(action) {
  try {
    const meResponse = yield call(login, action.payload);
    yield put(loginCompleted(meResponse));
  } catch (error) {
    toastService.showErrorToast(error.message);
    yield put(loginError(error));
  }
}

export function* watchLoginUserChanged() {
  yield all([
    takeEvery(ME_LOGIN, addUser),
    takeEvery(ME_FETCH, fetchUser),
    takeEvery(ME_LOGOUT, loggedOut),
  ]);
  yield;
}

export function* fetchUser(action) {
  try {
    const meData = yield call(me);
    yield put(fetchCompleted(meData));
  } catch (error) {
    toastService.showErrorToast(error.message);
    yield put(loginError(error));
  }
}

export function* loggedOut() {
  try {
    yield call(logout);
    yield put(logoutUser());
  } catch (error) {}
}
