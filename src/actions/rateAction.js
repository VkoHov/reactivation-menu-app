export const changeData = (project) => {
    return (dispatch, getState, {getFirestore}) =>{
        const firestore = getFirestore();
        
        firestore.collection('dishes').doc(project.id).update({
            rating: firestore.FieldValue.arrayUnion(project.rating)
        }).then(() => {
            dispatch({ type: 'CHANGEDATA_SUCCESS' });
          }).catch(err => {
            dispatch({ type: 'CHANGEDATA_ERROR' }, err);
          });
    }
}