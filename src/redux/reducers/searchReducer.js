const initState = {
    isOpen: false,
};
const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SEARCH_POP_UP_TOGGLE':
            return {
                isOpen: action.toggle,
            };
        default:
            return state;
    }
};

export default searchReducer;