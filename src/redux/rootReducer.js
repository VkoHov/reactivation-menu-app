import {combineReducers} from 'redux';
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';
import authReducer from './reducers/authReducer';
import tableReducer from './reducers/tableReducer';
import newDishReducer from './reducers/newDishReducer';
import rateReducer from './reducers/rateReducer';
import dishDetailReducer from './reducers/dishDetailReducer';
export default combineReducers({
    login: authReducer,
    tableInfo: tableReducer,
    rateInfo: rateReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    newDish: newDishReducer,
    dishInfo: dishDetailReducer,
})