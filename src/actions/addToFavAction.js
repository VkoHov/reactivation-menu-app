export const addFavToFireStore = (info)=>{
    return (dispatch, getState, {getFirestore}) =>{
        const firestore = getFirestore();
        firestore.collection("users").doc(info.id).update({
            favorites: firestore.FieldValue.arrayUnion(info)})
        .then(() => {
            dispatch({type: 'ADD_TO_FAVORITES', info});
        })
    }  
}