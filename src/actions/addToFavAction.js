export const addFavToFireStore = (info) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection("users").doc(info.id).update({
            favorites: firestore.FieldValue.arrayUnion(info)
        })
        .then(() => {
            dispatch({type: 'ADD_TO_FAVORITES', info});
        }).catch(err => {
            dispatch({type: 'ADD_TO_FAVORITES_ERROR', err});
        });
    }
};
export const removeFromFirestore = (info) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection("users").doc(info.id).update({
            favorites: info.filteredFavs
        }).then(() => {
            dispatch({type: 'REMOVE_FROM_FAVORITES', info}, console.log("removed"));
        })

    }
};