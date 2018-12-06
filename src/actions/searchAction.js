export const searchPopUpToggle = (toggle) => {
    return (dispatch) =>{
        dispatch({type: 'SEARCH_POP_UP_TOGGLE',toggle})
    }
};