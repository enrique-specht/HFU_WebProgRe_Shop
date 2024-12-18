import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./shopReducer";
import userReducer from "./userReducer";

const config = {
  reducer: {
    shop: shopReducer,
    user: userReducer,
  },
};

const store = configureStore(config);

export default store;
//https://redux.js.org/tutorials/typescript-quick-start
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
