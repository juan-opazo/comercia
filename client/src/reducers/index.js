import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { myProductsReducer, productsReducer } from './productReducer';

export default combineReducers({
    auth: authReducer,
    myProducts: myProductsReducer,
    products: productsReducer,
});