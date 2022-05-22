import { createSlice } from "@reduxjs/toolkit";
import { sortArray } from "../Utils";

const initialState = {
  categories: [],
  isLoading: false,
  isCategoryPieLoading: false,
  categoriesPie: [],
  categoriesError: undefined,
  isCategoriesPieLoaded: false,
  error: undefined,
  filterParams: {},
  isCategoriesLoaded: false,
  subCategories: [],
  isSubCategoriesLoaded: false,
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    loading: (state) => {
      state.isLoading = true;
      state.error = undefined;
    },
    pieLoading: (state) => {
      state.isCategoryPieLoading = true;
      state.categoriesError = undefined;
    },
    indexCategories: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
      state.isCategoriesLoaded = true;
    },
    indexPieCategories: (state, action) => {
      state.categoriesPie = action.payload;
      state.isCategoryPieLoading = false;
      state.isCategoriesPieLoaded = true;
    },
    indexSubCategories: (state, action) => {
      state.subCategories = action.payload;
      state.isLoading = false;
      state.isSubCategoriesLoaded = true;
    },
    getCategoryById: (state, action) => {
      state.categories[
        state.categories.findIndex((e) => e.id === action.payload.id)
      ] = action.payload;
      state.isLoading = false;
    },
    deleteCategoryFromCategories: (state, action) => {
      state.categories.splice(
        state.categories.findIndex((e) => e.id === action.payload.id),
        1
      );
      state.isLoading = false;
      state.isCategoriesPieLoaded = false;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
      state.categories = sortArray(state.categories);
      state.isLoading = false;
      state.isCategoriesPieLoaded = false;
    },
    addSubCategory: (state, action) => {
      state.subCategories.push(action.payload);
      state.subCategories = sortArray(state.subCategories);
      state.isLoading = false;
      state.isCategoriesPieLoaded = false;
    },
    error: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    pieError: (state, action) => {
      state.pieError = action.payload;
      state.isCategoryPieLoading = false;
    },
    resetCategoryItems: (state, action) => {
      state.isCategoriesLoaded = false;
      state.isSubCategoriesLoaded = false;
      state.isCategoriesPieLoaded = false;
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
  addSubCategory,
  indexSubCategories,
  resetCategoryItems,
  pieLoading,
  indexPieCategories,
  pieError,
} = categorySlice.actions;

export default categorySlice.reducer;
