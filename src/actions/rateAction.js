export const changeData = (project) => {
    return (dispatch, getState, {getFirestore}) =>{
        const firestore = getFirestore();
        firestore.collection('dishes').doc("mRgxS1gcHOD9fNm3M9uj").update({
            rating: firestore.FieldValue.arrayUnion(project)
        }).then(() => {
            dispatch({ type: 'CHANGEDATA_SUCCESS' });
          }).catch(err => {
            dispatch({ type: 'CHANGEDATA_ERROR' }, err);
          });
    }
}