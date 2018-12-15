export const AdminReg = (newAdmin) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection("administrators").add({
        	...newAdmin,
        }).then(() => {
            dispatch({type: 'NEW_ADMIN', newAdmin});
        })
    }
};