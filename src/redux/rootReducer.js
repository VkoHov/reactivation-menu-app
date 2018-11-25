import {combineReducers} from 'redux';
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';
import authReducer from './reducers/authReducer';
import tableReducer from './reducers/tableReducer';

export default combineReducers({
    login: authReducer,
    tableInfo: tableReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
})