import React, { Component } from "react";
import { connect } from "react-redux";
import Quantity from "../Quantity/Quantity";
import { Link } from "react-router-dom";
import Status from "../Status/Status";
import {shoppingCartMinusAction} from "../../actions/shoppingCartAction";

class ShoppingCart extends Component {
  constructor(props){
    super(props)
    this.state = {
      removed: false,
      count: null,
      popUpIsOpen: false,
    };
    this.showPopUp = this.showPopUp.bind(this);
  }
 
  showPopUp = () => {
    this.setState({
        popUpIsOpen: !this.state.popUpIsOpen,
    })
}
  removeDish() {
    let storageCount = JSON.parse(sessionStorage.getItem('shoppingCartCount'))
    let shopCartCount = this.props.shoppingCartCount;
 shopCartCount = shopCartCount-1;
      storageCount.count --;
      
      this.props.shoppingCartMinusAction(shopCartCount);
      sessionStorage.setItem("shoppingCartCount",JSON.stringify({count:storageCount.count }))
      this.setState({
      removed: !this.state.removed
    });
  }
   updateCount(newCount){
     this.setState({
      count: newCount,
     })
     
  }
 
  render() {
    const dishInfo = JSON.parse(sessionStorage.getItem("dishInfo"));
    console.log("shopping carti propsna",this.props.dishInfo)
    let totalPirce = 0;
    if (dishInfo) {
      return (
        <div>
          My CART
          
          {dishInfo.map((dish, index) => {
             
            let price = dish && dish.price;
            let count = dish && dish.count;
             totalPirce = totalPirce + count * price;

            console.log("our dish",totalPirce,count,price);
            return (
              
              <div key={index}>
                <div>{dish.title}</div>
               <Quantity update = {this.updateCount.bind(this)} index = {index} count = {dish.count} price = {dish.price}/>
          
                <div>Description: {dish.description}</div>
                <div>Unit Price: {dish && dish.price}</div>
                
                <div>Ingrediens: {dish.ingredient && dish.ingredient.join(" , ") || null}</div>
                <div>Doneness: {dish.doneness && dish.doneness || null}</div>
                <span
                   onClick={() => {
                    this.removeDish();
                    
                    let dishes = JSON.parse(sessionStorage.getItem("dishInfo"));
                    console.log("remove rabotatet",dishes)
                    let disharr = dishes.filter(item => {
                         return (
                            (item.ingredient !== dish.ingredient &&
                                item.ingredient.length !== dish.ingredient.length) ||
                          item.doneness !== dish.doneness ||
                           (item.title !== dish.title && item)
                       );
                    });

                     if (disharr.length === 0) {
                        sessionStorage.setItem("dishInfo", null);
                   } else {
                       sessionStorage.setItem(
                            "dishInfo",
                          JSON.stringify(disharr)
                        );
                    }
                  }} >Remove </span>

                
                <div>Rating: {dish.rating}</div>
              </div>
            );
          })}{console.log("totalpric",totalPirce)}
          <p>Price: {totalPirce}</p>
          <p>Delivery: 500</p>
          <p>Total Price: {totalPirce+500} </p>
          <button onClick = {this.showPopUp}>Order Now</button>
          {this.state.popUpIsOpen && <div onClick={(e)=> {e.stopPropagation()}}><Status dish={dishInfo} /></div> }
             
        </div>
      );
    } else {
      return (
        <div>
          SHOPPING CART IS EMPTY TO ADD SOMETHING CLICK
          <Link to="/listing"> HERE</Link>
        </div>
      );
    }
  }
}
const  mapDispatchToProps = dispatch => {
  return {
    
 shoppingCartMinusAction: count => {
      dispatch(shoppingCartMinusAction(count));
    }
  };
};
const mapStateToProps = state => {
  return {
    dishInfo: state,
    shoppingCartCount: state.shoppingCart.shoppingCartCount,
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingCart);
