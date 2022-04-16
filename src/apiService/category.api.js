import axios from "axios";
import { BASE_URL } from "../constants/secrets";
import { get } from "./base.api";

export const editCategoryApi = async (id, data) => {
  try {
    const url = BASE_URL + `category/${id}`;
    const response = await axios.put(url, { data });
    return response.data;
  } catch (error) {
    throw new Error(error.data.message);
  }
};

export const deleteCategoryApi = async (id) => {
  try {
    const url = BASE_URL + `category/${id}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    throw new Error(error.data.message);
  }
};

export const addSubCategoryApi = async (data) => {
  try {
    const url = BASE_URL + "subcategory";
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.data.message);
  }
};

export const showAllCategoriesApi = async (filters) => {
  try {
    const url = BASE_URL + "show-categories";
    const response = await get(url, { params: filters });
    return response.data;
  } catch (error) {
    throw new Error(error.data.message);
  }
};
