const initState = {};
const projectReducer = (state = initState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        console.log("reduceri datana add to cart component sarqeluc es datana petq",action.dishInfo);
        return state;
      
      default:
        return state;
    }
  };
  
  export default projectReducer;