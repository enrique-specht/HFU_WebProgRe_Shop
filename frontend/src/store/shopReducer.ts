import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import axios from "../services/axiosInstance";

export const loadCategories = createAsyncThunk(
  "shop/loadCategories",
  async () => {
    const categories = (await axios.get<Category[]>("/shop/categories")).data;
    const subcategories = (
      await axios.get<Subcategory[]>("/shop/subcategories")
    ).data;

    const mergedCategories: Category[] = categories.map((category) => {
      const subcategoriesForCategory = subcategories.filter((subcategory) =>
        category.subcategoryIds.includes(subcategory._id)
      );
      return {
        ...category,
        subcategories: subcategoriesForCategory,
      };
    });

    return mergedCategories;
  }
);

export const loadArticles = createAsyncThunk(
  "shop/loadArticles",
  async () => (await axios.get<Article[]>("/shop/articles")).data
);

export const loadArticlesByCategory = createAsyncThunk(
  "shop/loadArticlesByCategory",
  async (categoryId: string) =>
    (await axios.get<Article[]>(`/shop/articles/${categoryId}`)).data
);

export const loadArticlesBySubcategory = createAsyncThunk(
  "shop/loadArticlesBySubcategory",
  async (args: { categoryId: string; subcategoryId: string }) =>
    (
      await axios.get<Article[]>(`/shop/articles/${args.categoryId}`)
    ).data.filter((article) => article.subcategory === args.subcategoryId)
);

export const updateArticles = createAction<Article[]>("shop/updateArticles");

const initialState: ShopReducer = {
  articles: [],
  categories: [],
  isLoading: true,
};

const shopReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCategories.pending, (state, _) => ({
      ...state,
      isLoading: true,
    }))
    .addCase(loadCategories.fulfilled, (state, action) => ({
      ...state,
      categories: action.payload,
      isLoading: false,
    }))
    .addCase(loadArticles.pending, (state, _) => ({
      ...state,
      isLoading: true,
    }))
    .addCase(loadArticles.fulfilled, (state, action) => ({
      ...state,
      articles: action.payload,
      isLoading: false,
    }))
    .addCase(loadArticlesByCategory.pending, (state, _) => ({
      ...state,
      isLoading: true,
    }))
    .addCase(loadArticlesByCategory.fulfilled, (state, action) => ({
      ...state,
      articles: action.payload,
      isLoading: false,
    }))
    .addCase(loadArticlesBySubcategory.pending, (state, _) => ({
      ...state,
      isLoading: true,
    }))
    .addCase(loadArticlesBySubcategory.fulfilled, (state, action) => ({
      ...state,
      articles: action.payload,
      isLoading: false,
    }))
    .addCase(updateArticles, (state, action) => ({
      ...state,
      articles: action.payload,
    }));
});

export default shopReducer;
