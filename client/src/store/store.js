import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice.js";
import ordersReducer from "../features/order/ordersSlice.js";


export const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
  },
});
