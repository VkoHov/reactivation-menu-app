import React, { Component } from 'react';
import './ShopingCart.css';
import { connect } from 'react-redux';
import Quantity from './Quantity';



 class ShoppingCart extends Component {
     
        
        
        
     
     
     render() { 
        let dishInfo = JSON.parse(sessionStorage.getItem('dishInfo'));
        
console.log('shopping cart dishinfo',dishInfo)
  
        if(dishInfo){
            return ( 
                <div>My CART 
                   {
                       
                       dishInfo.map((dish,index)=>{
                           return(
                               <div key = {index}>
                               <div>{dish.title}</div>
                               <div>Description: {dish.description}</div>
                               <div>Unit Price: {dish.price}</div>
                               <div>QUANTITY: {dish.count}</div>
                               <Quantity count = {dish.count} price = {dish.price}/>
                               <div>Rating: {dish.rating}</div>
                              
                               
                               
                              
                             </div>
                           )
                       })
                   }
                  
                </div> );
        }else{
            return(
                <div>SHOPPING CART IS EMPTY</div>
            )
        }
        
     }
 }
  const mapStateToProps = (state) => {
      return{
        dishInfo: state,
      }
      
  }

 export default connect(mapStateToProps)(ShoppingCart);