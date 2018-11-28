import {createStore} from 'redux'
const initialState = {
  newDish:[
  	{title:'',
		description:"",
		image:"",
		price:""},
  	  ]
}

 function newDishReducer(state = initialState, action) {
  switch(action.type) {
      case 'NEW_DISH':
        return {
          newDish:  [...state.newDish, action.newDish],
        } 
       
      default:
        return state
  }

}

let store = createStore(newDishReducer).getState();
export { store,newDishReducer as default};