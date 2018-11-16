import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import loginReducer from './reducers/loginReducer'

export default combineReducers({
    login: loginReducer,
    firestore: firestoreReducer,
})