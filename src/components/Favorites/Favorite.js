import React, { Component } from 'react';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from 'react-router-dom';
import { compose } from "redux";
class Favorites extends Component {
    state = {  }
    render() { 
        let userId = this.props.auth.uid;
        
        let favorites = this.props.firestoreInfo && this.props.firestoreInfo[userId].favorites;
        console.log("afef", favorites )
         return !this.props.auth.uid && <Redirect to="/login"/> ||
         <div>
              <div>MY FAVORITES</div>
              {favorites && favorites.map((dish,index) =>{
                  return(
                      <div key = {index}>
                       <p>{dish.favoriteDish?  dish.favoriteDish.title : dish.title}</p>
                      <p>{dish.favoriteDish? dish.favoriteDish.description : dish.description}</p>
                      <p> 
                      {dish.favoriteDish && dish.favoriteDish.doneness.length !== 0 ?
                      dish.favoriteDish.doneness : dish.favdoneness}
                     </p> 
                     <p> 
                      {dish.favoriteDish && dish.favoriteDish.ingredients.length !== 0 ?
                      dish.favoriteDish.ingredients : dish.favIngredient}
                     </p> 
                     
                    
                       

                      </div>
                  )
              })}

         </div>
    
        
    }
}
const mapStateToProps = state => {
    return{
        auth: state.firebase.auth,
        firestoreInfo: state.firestore.data.users,
    }
}
 
export default compose(
  connect(
    mapStateToProps
  ),
  firestoreConnect([{ collection: "users" }])
)(Favorites);