import axios from "axios";
import { AUTH_TOKEN, BASE_URL } from "../constants/secrets";

export const signup = async (data) => {
  const url = BASE_URL + "/signup";
  const response = await axios.post(url, data);
  return response.data.user;
};

export const login = async (data) => {
  const url = BASE_URL + "/login";
  const response = await axios.post(url, data);
  localStorage.setItem(AUTH_TOKEN, response.data.token);
  return response.data.user;
};

export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN);
};

export const me = async () => {
  const url = BASE_URL + "/me";
  const response = await axios.get(url);
  return response.data.data;
};

export const meChange = async (data) => {
  const url = BASE_URL + "/me";
  const response = await axios.put(url, data);
  return response.data;
};
