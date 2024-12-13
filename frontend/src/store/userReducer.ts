import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axiosInstance";

export const loadUserState = createAsyncThunk(
  "user/loadUserState",
  async () => (await axios.get("/verify-token", { withCredentials: true })).data
);

const initialState: UserReducer = {
  isLoggedIn: false,
  isLoading: true,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadUserState.pending, (state, _) => ({
      ...state,
      isLoading: true,
    }))
    .addCase(loadUserState.fulfilled, (state, _) => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
    }))
    .addCase(loadUserState.rejected, (state, _) => ({
      ...state,
      isLoggedIn: false,
      isLoading: false,
    }));
});

export default userReducer;
