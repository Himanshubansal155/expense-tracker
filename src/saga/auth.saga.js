import { call, put, takeEvery, all } from "redux-saga/effects";
import { login, logout, me, signup, loginMobile } from "../apiService/Auth.api";
import {
  ME_FETCH,
  ME_LOGIN,
  ME_LOGIN_MOBILE,
  ME_LOGOUT,
  ME_SIGNUP,
} from "../constants/action.constants";
import {
  fetchCompleted,
  loginCompleted,
  loginError,
  logoutUser,
  loading,
} from "../Reducers/AuthReducer";
import toastService from "../services/toastService";

export function* logUser(action) {
  try {
    yield put(loading());
    const meResponse = yield call(login, action.payload.data);
    yield put(loginCompleted(meResponse));
    action.payload.navigator("/");
    toastService.showtoast("Logged in Successfully");
  } catch (error) {
    toastService.showErrorToast(error.message);
    yield put(loginError(error));
  }
}
export function* loginMobileUser(action) {
  try {
    yield put(loading());
    const meResponse = yield call(loginMobile, action.payload.data);
    yield put(loginCompleted(meResponse));
    action.payload.navigator("/");
    toastService.showtoast("Logged in Successfully");
  } catch (error) {
    toastService.showErrorToast(error.message);
    yield put(loginError(error));
  }
}
export function* signupUser(action) {
  try {
    yield put(loading());
    const meResponse = yield call(signup, action.payload.data);
    yield put(loginCompleted(meResponse));
    action.payload.navigator("/");
    toastService.showtoast("Logged in Successfully");
  } catch (error) {
    toastService.showErrorToast(error.message);
    yield put(loginError(error));
  }
}

export function* fetchUser(action) {
  try {
    yield put(loading());
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
  } catch (error) {
    toastService.showErrorToast(error.message);
    yield put(loginError(error));
  }
}

export function* watchLoginUserChanged() {
  yield all([
    takeEvery(ME_LOGIN, logUser),
    takeEvery(ME_FETCH, fetchUser),
    takeEvery(ME_LOGOUT, loggedOut),
    takeEvery(ME_SIGNUP, signupUser),
    takeEvery(ME_LOGIN_MOBILE, loginMobileUser),
  ]);
  yield;
}
