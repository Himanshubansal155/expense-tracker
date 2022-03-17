import axios from "axios";
import { AUTH_TOKEN, BASE_URL } from "../constants/secrets";
import { get } from "./base.api";

export const signup = async (data) => {
  const url = BASE_URL + "signup";
  const response = await axios.post(url, data);
  return response.data.user;
};

export const login = async (data) => {
  const url = BASE_URL + "login";
  try {
    const response = await axios.post(url, data);
    if (!!response?.data?.user) {
      localStorage.setItem(AUTH_TOKEN, response.data.token);
      return response.data.user;
    }
  } catch (error) {
    throw new Error(error.data.message);
  }
};

export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN);
};

export const me = async () => {
  try {
    const url = BASE_URL + "me";
    const response = await get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.data.message);
  }
};

export const meChange = async (data) => {
  const url = BASE_URL + "me";
  const response = await axios.put(url, data);
  return response.data;
};
