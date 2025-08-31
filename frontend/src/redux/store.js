import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
