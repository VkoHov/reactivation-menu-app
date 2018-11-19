const initialState = {
  newDish:[
  	{title:'',
		description:"",
		image:"",
		changeIng:[],
		price:""},
  	  ]
}

export default function newDishReducer(state = initialState, action) {
  switch(action.type) {
      case 'NEW_DISH':
     	console.log(action.newDish);
        return {
          newDish:  [...state.newDish, action.newDish],
        }
      default:
        return state
  }

}