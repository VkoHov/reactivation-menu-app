
import React, { Component } from 'react';

import DishDetails from '../../DishDetails/DishDetails';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import {addFavToFireStore} from "../../../actions/addToFavAction";
import StarRatingComponent from 'react-star-rating-component';


class Dish extends Component {
   
   
    constructor(props) {
        super(props);

        this.state = {
            popUpIsOpen: false,
            starUrl: "https://firebasestorage.googleapis.com/v0/b/menu-app-d88b1.appspot.com/o/star.png?alt=media&token=361e13d4-7882-4400-90f1-b72278a8a382",
        };

        this.showPopUp = this.showPopUp.bind(this);
    }

    showPopUp = () => {
        this.setState({
            popUpIsOpen: !this.state.popUpIsOpen,
        })
    };
    addToFavorites =() => {
          this.props.favorite.uid && this.props.addFavToFireStore({
            id: this.props.favorite.uid,
            favoriteDish: this.props.dish,
         })
           
        
    }

    render() {
        let style = {backgroundImage:`url(${this.props.dish.url })`,} 


        let rating = this.props.dish.rating.reduce((i,acum) => {
            return acum += i;
        },0);
        let ratingg = rating /this.props.dish.rating.length;
        return (
            <div className="dishBl">
            <div className="dishBlock" style={style} onClick={this.showPopUp} >
           
            </div>
                <div >

                    <h5>
                        {this.props.dish.title}
                        <p onClick ={this.addToFavorites}><i className="far fa-heart"/></p>
                    </h5>
                    <div className="starBox">
                      <div className="star-container " >
                      <StarRatingComponent 
                        name="rate1" 
                        starCount={5}
                        value={ratingg }
                        starColor={'#ff9900'}
                        emptyStarColor={'#707070'}
                        />
                    </div>

                    </div>
                    <p className="dishDesc">{this.props.dish.description}</p>
                </div>
                {this.state.popUpIsOpen && <div ><DishDetails closePopup={this.showPopUp} dish={this.props}/></div>}
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return{
        favorite:  state.firebase.auth,
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        addFavToFireStore: info => dispatch(addFavToFireStore(info))
    }
}

export default compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect([{ collection: "users" }])
  )(Dish);