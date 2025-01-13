import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import axios from "../services/axiosInstance";

const loadUserState = createAsyncThunk(
  "user/loadUserState",
  async () => (await axios.get("/account-data", { withCredentials: true })).data
);

const addToCart = createAction<CartArticle>("user/addToCart");
const removeFromCart = createAction<string>("user/removeFromCart");
const updateCart = createAction<CartArticle>("user/updateCart");
const clearCart = createAction("user/clearCart");

const loadOrders = createAsyncThunk(
  "user/loadOrders",
  async () => (await axios.get("/shop/orders", { withCredentials: true })).data
);

const clearUserData = createAction("user/clearUserData");

const getCartFromLocalStorage = (): CartArticle[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const setCartInLocalStorage = (cart: CartArticle[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState: UserReducer = {
  user: {} as User,
  isLoggedIn: false,
  isLoading: true,
  cart: getCartFromLocalStorage(),
  orders: [],
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadUserState.pending, (state, _) => ({
      ...state,
      isLoading: true,
    }))
    .addCase(loadUserState.fulfilled, (state, action) => ({
      ...state,
      user: action.payload,
      isLoggedIn: true,
      isLoading: false,
    }))
    .addCase(loadUserState.rejected, (state, _) => ({
      ...state,
      isLoggedIn: false,
      isLoading: false,
    }))
    .addCase(addToCart, (state, action) => {
      const newArticle = action.payload;
      const existingArticle = state.cart.find(
        (cartArticle) => cartArticle.id === newArticle.id
      );

      let updatedCart: CartArticle[];
      if (existingArticle) {
        updatedCart = state.cart.map((cartArticle) =>
          cartArticle.id === newArticle.id
            ? {
                ...cartArticle,
                quantity: cartArticle.quantity + newArticle.quantity,
              }
            : cartArticle
        );
      } else {
        updatedCart = [...state.cart, newArticle];
      }

      setCartInLocalStorage(updatedCart);

      return {
        ...state,
        cart: updatedCart,
      };
    })
    .addCase(removeFromCart, (state, action) => {
      const updatedCart = state.cart.filter(
        (article) => article.id != action.payload
      );

      setCartInLocalStorage(updatedCart);

      return {
        ...state,
        cart: updatedCart,
      };
    })
    .addCase(updateCart, (state, action) => {
      const updatedCart = state.cart.map((cartArticle) =>
        cartArticle.id === action.payload.id
          ? {
              ...action.payload,
            }
          : cartArticle
      );

      setCartInLocalStorage(updatedCart);

      return {
        ...state,
        cart: updatedCart,
      };
    })
    .addCase(clearCart, (state, _) => {
      const updatedCart: CartArticle[] = [];

      setCartInLocalStorage(updatedCart);

      return {
        ...state,
        cart: updatedCart,
      };
    })
    .addCase(loadOrders.fulfilled, (state, action) => ({
      ...state,
      orders: action.payload,
    }))
    .addCase(clearUserData, (state, _) => ({
      ...state,
      isLoggedIn: false,
      user: {} as User,
    }));
});

export default userReducer;
export {
  loadOrders,
  loadUserState,
  addToCart,
  updateCart,
  clearCart,
  removeFromCart,
  clearUserData,
};
