import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  login,
  logout,
  me,
  signup,
  loginMobile,
  editUserApi,
  deleteUserApi,
  verifyPasswordApi,
} from "../apiService/Auth.api";
import {
  ME_DELETE_USER,
  ME_FETCH,
  ME_LOGIN,
  ME_LOGIN_MOBILE,
  ME_LOGOUT,
  ME_PASSWORD_VERIFY,
  ME_SIGNUP,
  ME_UPDATE_DETAILS,
} from "../constants/action.constants";
import {
  fetchCompleted,
  loginCompleted,
  loginError,
  logoutUser,
  loading,
  updateCompleted,
  verified,
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
export function* updateUserDetails(action) {
  try {
    yield put(loading());
    const response = yield call(editUserApi, action.payload.data);
    yield put(updateCompleted(response));
  } catch (error) {
    toastService.showErrorToast(error.message);
    yield put(loginError(error));
  }
}

export function* deleteUser() {
  try {
    yield put(loading());
    const response = yield call(deleteUserApi);
    if (!!response) {
      yield call(logout);
      yield put(logoutUser());
    }
  } catch (error) {
    toastService.showErrorToast(error.message);
    yield put(loginError(error));
  }
}
export function* verifyUserPassword(action) {
  try {
    yield put(loading());
    const response = yield call(verifyPasswordApi, action.payload.data);
    if (!!response) {
      yield put(verified());
    }
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
    takeEvery(ME_UPDATE_DETAILS, updateUserDetails),
    takeEvery(ME_DELETE_USER, deleteUser),
    takeEvery(ME_PASSWORD_VERIFY, verifyUserPassword),
  ]);
  yield;
}
