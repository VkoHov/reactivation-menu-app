const initialState = {
    categoryName: 'all menu',
};

const listingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_CAT_NAME':
            console.log('adgdd', action.catName);

            return { categoryName: action.catName };
        default:
            return state
    }
};
export default listingReducer;