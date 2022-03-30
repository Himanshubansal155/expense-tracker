import { ME_LOGIN, ME_LOGIN_MOBILE, ME_SIGNUP } from "../constants/action.constants";

export const userLoginAction = (data, navigator) => ({
  type: ME_LOGIN,
  payload: { data, navigator },
});

export const userLoginMobileAction = (data, navigator) => ({
  type: ME_LOGIN_MOBILE,
  payload: { data, navigator },
});

export const userSignUpAction = (data, navigator) => ({
  type: ME_SIGNUP,
  payload: { data, navigator },
});
