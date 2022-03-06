import axios from "axios";
import { CANCEL } from "redux-saga";
import { AUTH_TOKEN } from "../constants/secrets";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem(AUTH_TOKEN);
  if (!token) {
    return config;
  }
  return {
    ...config,
    headers: { ...config.headers, token: token },
  };
});

axios.interceptors.response.use(undefined, function (error) {
  if (axios.isCancel(error)) {
    return Promise.reject(Error);
  }
  if (error.response.data.code === 9101) {
    localStorage.removeItem(AUTH_TOKEN);
    window.location.href = "/login";
  }
  return Promise.reject(error.response);
});

export const get = (url, config) => {
  let source = axios.CancelToken.source();
  let response = axios.get(url, { ...config, cancelToken: source.token });
  response[CANCEL] = source.cancel;
  return response;
};

export const post = (url, config) => {
  let source = axios.CancelToken.source();
  let response = axios.post(url, { ...config, cancelToken: source.token });
  response[CANCEL] = source.cancel;
  return response;
};
