const initialState = {
    empty: false,
  }
  
  export default function tableReducer(state = initialState, action) {
    switch(action.type) {
        case 'CHANGEINFO_SUCCESS':
            return{
                ...state,
                empty:true,
            } 

        default:
          return state
    }
  }