const initialState = {
    sliderId: 'header',
};

const navbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HOMEPAGE_SLIDER':
            return { sliderId: action.sliderId };
        default:
            return state
    }
};
export default navbarReducer;