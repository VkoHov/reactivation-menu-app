import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import tableReducer from './reducers/tableReducer'
import loginReducer from './reducers/loginReducer'

export default combineReducers({
    login: loginReducer,
    tableInfo: tableReducer,
    firestore: firestoreReducer,
})