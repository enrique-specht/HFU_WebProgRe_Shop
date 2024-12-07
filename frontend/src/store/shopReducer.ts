import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axiosInstance";

export const loadCategories = createAsyncThunk(
  "shop/loadCategories",
  async () => (await axios.get<Category[]>("/shop/categories")).data
);

export const loadArticles = createAsyncThunk(
  "shop/loadArticles",
  async () => (await axios.get<Article[]>("/shop/articles")).data
);

const initialState: ShopReducer = {
  articles: [],
  categories: [],
};

const shopReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCategories.fulfilled, (state, action) => ({
      ...state,
      categories: action.payload,
    }))
    .addCase(loadArticles.fulfilled, (state, action) => ({
      ...state,
      articles: action.payload,
    }));
});

export default shopReducer;
