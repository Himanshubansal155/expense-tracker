import { createSlice } from "@reduxjs/toolkit";
import { sortArray } from "../Utils";

const initialState = {
  categories: [],
  isLoading: false,
  error: undefined,
  filterParams: {},
  isCategoriesLoaded: false,
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    loading: (state) => {
      state.isLoading = true;
      state.error = undefined;
    },
    indexCategories: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
      state.isCategoriesLoaded = true;
    },
    getCategoryById: (state, action) => {
      state.categories[
        state.categories.findIndex((e) => e.id === action.payload.id)
      ] = action.payload;
      state.isLoading = false;
    },
    deleteCategoryFromCategories: (state, action) => {
      state.categories = state.categories.splice(action.payload, 1);
      state.isLoading = false;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
      state.categories = sortArray(state.categories);
      state.isLoading = false;
    },
    error: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  loading,
  indexCategories,
  error,
  deleteCategoryFromCategories,
  addCategory,
  getCategoryById,
} = categorySlice.actions;

export default categorySlice.reducer;
