export const changeCategoryName = (catName) => {

    return (dispatch) => {
        dispatch({
            type: 'CHANGE_CAT_NAME',
            catName,
        })
    }
}