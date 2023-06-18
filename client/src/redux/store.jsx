import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./auth/authSlice";
import { api } from "../apis/apis";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,

    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
