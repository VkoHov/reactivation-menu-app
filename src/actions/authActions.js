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
export const LogoutAction = () => {
    return (dispatch, getState, {getFirebase}) => {
        let firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({type: 'LOGOUT_SUCCESS'});
        });
    }
}
export  const SignUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password,
        ).then((resp) => {
            return firestore.collation('users').doc(resp.user.uid)
        });
    }

}