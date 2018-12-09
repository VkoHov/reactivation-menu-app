export const changeStatus = (table) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('tables').doc(table.id).update({
            reservInfo: firestore.FieldValue.arrayUnion(table.info),
            reservDate: firestore.FieldValue.arrayUnion(table.info.date),
        }).then(() => {
            dispatch({ type: 'CHANGEINFO_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'CHANGEINFO_ERROR' }, err);
        });
    }
}