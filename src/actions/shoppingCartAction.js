export const shoppingCartPlusAction = (count) => {
    return (dispatch, getState) =>{
        dispatch({ type: 'ADD_COUNT_OF_SHP', count });
    }
}
export const shoppingCartMinusAction = (count) => {
    return (dispatch, getState) =>{
        dispatch({ type: 'SUBTRACT_COUNT_OF_SHP', count });
    }
}
