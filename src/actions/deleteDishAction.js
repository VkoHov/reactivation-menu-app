export const deleteDish = (dish) => {

    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        firestore.collection('dishes').doc(dish.id).delete();
    }
}

