const initialState = {
  users:[],
}

export default function loginReducer(state = initialState, action) {
  switch(action.type) {
      case 'LOGIN_SUBMIT':
        return {
          users:  [...state.users, action.user],
        }
      default:
        return state
  }
}