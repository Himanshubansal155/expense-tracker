import axios from "axios";
import { BASE_URL } from "../constants/secrets";
import { get } from "./base.api";

export const showExpenseApi = async (id) => {
  try {
    const url = BASE_URL + `expense/${id}`;
    const response = await get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.data.message);
  }
};

export const editExpenseApi = async (id, data) => {
  try {
    const url = BASE_URL + `expense/${id}`;
    const response = await axios.put(url, { data });
    return response.data;
  } catch (error) {
    throw new Error(error.data.message);
  }
};

export const deleteExpenseApi = async (id) => {
  try {
    const url = BASE_URL + `expense/${id}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    throw new Error(error.data.message);
  }
};

export const addExpenseApi = async (data) => {
  try {
    const url = BASE_URL + "expense";
    const response = await axios.post(url, { data });
    return response.data;
  } catch (error) {
    throw new Error(error.data.message);
  }
};

export const showAllExpensesApi = async (filters) => {
  try {
    const url = BASE_URL + "all-expenses";
    const response = await get(url, { params: filters });
    return response.data;
  } catch (error) {
    throw new Error(error.data.message);
  }
};
