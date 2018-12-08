export const changeTableStatus = (status) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
console.log(typeof(status.id));
        return firestore.collection('tables').doc(status.id+'').update({
            status: status.status,
        }).then(() => {
            dispatch({ type: 'DELETE_INFO_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'DELETE_INFO_ERROR' }, err);
        });
    }
}