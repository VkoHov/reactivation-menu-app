import {combineReducers} from 'redux';
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';
import authReducer from './reducers/authReducer';
import tableReducer from './reducers/tableReducer';
import rateReducer from './reducers/rateReducer';
import dishDetailReducer from './reducers/dishDetailReducer';
import listingReducer from './reducers/listingReducer';
import navbarReducer from './reducers/navbarReducer';
import shoppingCartCount from './reducers/shoppingCartReducer';
import searchReducer from './reducers/searchReducer'
export default combineReducers({
    login: authReducer,
    tableInfo: tableReducer,
    rateInfo: rateReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    dishInfo: dishDetailReducer,
    listing: listingReducer,
    navbar: navbarReducer,
    search: searchReducer,
    shoppingCart: shoppingCartCount,
})