import { configureStore } from "@reduxjs/toolkit";
import isLoading from './Slices/isLoading.slice'
import products from './Slices/products.slice'
import purchases from "./Slices/purchases.slice";
import Cart from "./Slices/cart.slice";

export default configureStore({
    reducer: {
        isLoading,
        products,
        purchases,
        Cart
    }
})