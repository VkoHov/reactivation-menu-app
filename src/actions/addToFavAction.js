export const addFavToFireStore = (info)=>{
    return (dispatch, getState, {getFirestore}) =>{
        const firestore = getFirestore();
        if(info.id){
            firestore.collection("users").doc(info.id).update({
                favorites: firestore.FieldValue.arrayUnion(info)})
    
                .then(() => {
                    dispatch({type: 'ADD_TO_FAVORITES', info});
                })
        }else {
            alert("Please login to add favorites")
     
        }
        
            // .catch(err => {
            //     dispatch({ type: 'DELETE_INFO_ERROR' }, err);
            // });
    }

}
export const removeFromFirestore = (info) =>{
    return(dispatch,getState,{getFirestore}) =>{
        const firestore = getFirestore();

        firestore.collection("users").doc(info.id).update({
            favorites: info.filteredFavs
        }).then(() => {
            dispatch({type: 'REMOVE_FROM_FAVORITES', info},console.log("removed"));
        })

    }
}