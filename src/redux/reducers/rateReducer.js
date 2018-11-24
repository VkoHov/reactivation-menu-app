const initState = {};
const projectReducer = (state = initState, action) => {
    switch (action.type) {
      case 'CHANGEDATA_SUCCESS':
        console.log('change data success');
        return state;
      case 'CHANGEDATA_ERROR':
        console.log('change data error',action.err);
        return state;
      default:
        return state;
    }
  };
  
  export default projectReducer;