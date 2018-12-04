export const clearReserveOrOrder = (table) => {
    console.log(table)
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        firestore.collection('tables').doc(table.id).update({
            status: 'free',
            orders: [],
        }).then(() => {
            dispatch({ type: 'CHANGEINFO_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'CHANGEINFO_ERROR' }, err);
        });
    }
}