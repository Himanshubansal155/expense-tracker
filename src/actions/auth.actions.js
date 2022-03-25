import { ME_LOGIN } from "../constants/action.constants";

export const userLoginAction = (data, navigator) => ({
  type: ME_LOGIN,
  payload: { data, navigator },
});
