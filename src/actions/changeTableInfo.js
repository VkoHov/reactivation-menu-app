export const changeStatus = (table) => {
    console.log(table)
    return (dispatch, getState, {getFirestore}) =>{
        const firestore = getFirestore();
        
        firestore.collection('tables').doc(table.id).update({
            
            status: table.status,
            reservedInfo:table.info,
        }).then(() => {
            dispatch({ type: 'CHANGEINFO_SUCCESS' });
          }).catch(err => {
            dispatch({ type: 'CHANGEINFO_ERROR' }, err);
          });
    }
}