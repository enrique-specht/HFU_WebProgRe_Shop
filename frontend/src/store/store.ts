import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import shopReducer from "./shopReducer";

const config: ConfigureStoreOptions = {
  reducer: shopReducer,
};

const store = configureStore(config);

export default store;
