const initState = {
    shoppingCartCount: 0,
};
const shoppingCartCount = (state = initState, action) => {
    switch (action.type) {
      case 'ADD_COUNT_OF_SHP':
        console.log('change data success');
        return {
            shoppingCartCount: action.count,
        }
     case 'SUBTRACT_COUNT_OF_SHP':
        console.log("removed");
        return {
            shoppingCartCount: action.count,
        }
      default:
        return state;
    }
  };
  
  export default shoppingCartCount;