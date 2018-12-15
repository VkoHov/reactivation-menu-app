export const clearReserveOrOrder = (table) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        return firestore.collection('tables').doc(table.id).update({
            orders: [],
            status:'free',
        })
        // .then(() => {
        //     dispatch({ type: 'DELETE_INFO_SUCCESS' });
        // }).catch(err => {
        //     dispatch({ type: 'DELETE_INFO_ERROR' }, err);
        // });
    }
}