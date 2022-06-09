import { configureStore } from "@reduxjs/toolkit";
import isLoading from './Slices/isLoading.slice'
import products from './Slices/products.slice'

export default configureStore({
    reducer: {
        isLoading,
        products
    }
})