export const addToCart = (dishInfo) => {
    return (dispatch, getState) =>{
        dispatch({ type: 'ADD_TO_CART', dishInfo });
    }
}