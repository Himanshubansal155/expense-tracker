import { call, put, takeEvery, all } from "redux-saga/effects";
import { login, logout, me } from "../apiService/Auth.api";
import { ME_FETCH, ME_LOGIN, ME_LOGOUT } from "../constants/action.constants";
import {
  fetchCompleted,
  loginCompleted,
  loginError,
  logoutUser,
  loginStart,
  fetchStart,
} from "../Reducers/AuthReducer";
import toastService from "../services/toastService";

export function* addUser(action) {
  try {
    yield put(loginStart());
    const meResponse = yield call(login, action.payload.data);
    yield put(loginCompleted(meResponse));
    action.payload.navigator("/");
    toastService.showtoast("Logged in Successfully");
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
    yield put(fetchStart());
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
