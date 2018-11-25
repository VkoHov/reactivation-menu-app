export const addNewDish = (newDish) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection("dishes").add({
        	...newDish,
        	adding:new Date(),
        }).then(() => {
            dispatch({type: 'NEW_DISH', newDish});
        })
    }
};
