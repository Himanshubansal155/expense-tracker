import axios from "axios";
import { AUTH_TOKEN } from "../constants/secrets";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem(AUTH_TOKEN);
  if (!token) {
    return config;
  }
  let source = axios.CancelToken.source();
  return {
    ...config,
    headers: { ...config.headers, Authorization: token },
    cancelToken: source.token,
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
  return Promise.reject(error);
});