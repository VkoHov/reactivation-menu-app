export const loginUser = (user) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        dispatch({type: 'LOGIN_SUBMIT', user});
    }
}