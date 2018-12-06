const initState = {};
const projectReducer = (state = initState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          dish:action.dishInfo,
        };
      
      default:
        return state;
    }
  };
  
  export default projectReducer;
