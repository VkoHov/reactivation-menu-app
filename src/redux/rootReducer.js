import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'
import authReducer from './reducers/authReducer'

export default combineReducers({
    login: authReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
})