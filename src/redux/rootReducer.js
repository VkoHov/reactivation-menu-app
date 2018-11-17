import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import authReducer from './reducers/authReducer'

export default combineReducers({
    login: authReducer,
    firestore: firestoreReducer,
})