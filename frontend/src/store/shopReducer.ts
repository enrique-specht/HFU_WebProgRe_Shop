import {
  createAction,
  createReducer,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "../services/axiosInstance";

const initialState = {
  tasks: [],
};

const shopReducer = createReducer(initialState, (builder) => {});

export default shopReducer;
