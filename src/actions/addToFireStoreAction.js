export const addToFirestore = (info) => {
    return (dispatch, getState, {getFirestore}) =>{
        const firestore = getFirestore();
        console.log("action",info);
        
       firestore.collection('tables').doc(info.tableNumber
            ).update({
            orders: firestore.FieldValue.arrayUnion(info)
        }).then(() => {
            dispatch({ type: 'ADDDATA_SUCCESS' });
            console.log("its work")
          }).catch(err => {
              console.log(err)
            dispatch({ type: 'ADDDATA_ERROR' }, err);
          });
        
    }
}