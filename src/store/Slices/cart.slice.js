import { createSlice } from '@reduxjs/toolkit';
import getConfig from '../../utils/getConfig';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import { getPurchases } from './purchases.slice';

export const Cart = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart:(state, action) =>{
            return action.payload
        }
    }
})

export const { setCart } = Cart.actions;

export const getCart = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart/", getConfig())
        .then(res => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addToCart = (added) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart/", added, getConfig())
        .then(() => dispatch(getCart()))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)));
}

export const buy = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", {}, getConfig())
        .then(() => {
            dispatch(getPurchases())
            dispatch(setCart([]))
        })

        .finally(() => dispatch(setIsLoading(false)));
}

export default Cart.reducer;
