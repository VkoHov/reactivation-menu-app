export const LoginAction = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        let firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password,
        ).then(() => {
            dispatch({type: 'LOGIN_SUCCESS', credentials});
        }).catch((err) => {
            dispatch({type: 'LOGIN_SUCCESS_ERR', err});
        })

    }
}