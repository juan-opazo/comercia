import { FECTH_MY_PRODUCTS, FECTH_PRODUCTS } from "../actions/types";

export const myProductsReducer = (state = null, action) => {
    switch (action.type) {
      case FECTH_MY_PRODUCTS:
        return action.payload || false;
      default:
        return state;
    }
  }

export const productsReducer = (state = null, action) => {
    switch (action.type) {
      case FECTH_PRODUCTS:
        return action.payload || false;
      default:
        return state;
    }
  }