import axios from "axios";
import { FETCH_USER, FECTH_MY_PRODUCTS, FECTH_PRODUCTS } from "./types";

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
}

export const createUser = (data) => async dispatch => {
    const res = await axios.post('/api/new_user', data);
    dispatch({ type: FETCH_USER, payload: res.data });
}

export const fetchMyProducts = (data) => async dispatch => {
    const res = await axios.get('/api/my_products', data);
    dispatch({ type: FECTH_MY_PRODUCTS, payload: res.data });
}

export const fetchProducts = () => async dispatch => {
    const res = await axios.get('/api/products');
    dispatch({ type: FECTH_PRODUCTS, payload: res.data });
}