const initialState = {
    authError: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS_ERR':
            console.log('login error');
            return {
                ...state,
                authError: 'Login Failed',
            };
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                ...state,
                authError: null,
            };
        case 'SIGNUP_SUCCESS':
            console.log('signup success');
            return {
                ...state,
                authError: null
            };
        case 'SIGNUP_ERROR':
            console.log('signup error');
            return {
                ...state,
                authError: action.err.message,
            };
        case 'LOGOUT_SUCCESS':
            console.log('logout success');
            return {
                ...state,
                authError: null
            };
        default:
            return state
    }
};
export default authReducer;