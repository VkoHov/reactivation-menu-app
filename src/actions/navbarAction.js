export const SlideToComponent = (sliderId) => {

    return (dispatch) => {
        dispatch({
            type: 'HOMEPAGE_SLIDER',
            sliderId,
        })
    }
}