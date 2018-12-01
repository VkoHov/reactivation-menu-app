export const deleteAdmin = (admin) => {

    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('administrators').doc(admin.id).delete();
    }
}

