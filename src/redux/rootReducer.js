import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'
import loginReducer from './reducers/loginReducer'

export default combineReducers({
    login: loginReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
})