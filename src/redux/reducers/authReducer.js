const initialState = {
    authError: null,
}

 const authReducer = (state = initialState, action) => {
  switch(action.type) {
      case 'LOGIN_SUCCESS_ERR':
          console.log('login error')
          console.log(state)
        return {
            ...state,
            authError: 'Login Failed',
        }
      case 'LOGIN_SUCCESS':
          console.log(action)
          console.log(state)
            return {
                ...state,
                authError: null,
            }
      default:
        return state
  }
}
export default  authReducer;