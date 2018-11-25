import React, { Component } from 'react';
import './ShopingCart.css';


class ShopingCart extends Component{

	

    render(){
        return(
            <div className="shoping">
            	<p className="shopingIcon" >
            	<i className="fas fa-shopping-cart"></i>
            		<span>0</span>
            	</p>
            	<div className="shopingCart">
            		<ul>
            			<li>
            				<div>img</div>
            				<div>	
            					<p>title</p>
            					<p>description</p>
            					<p>price</p>
            					<span><i className="far fa-times-circle"></i></span>
            				</div>
            			</li>
            			<li>
            				<div>img</div>
            				<div>	
            					<p>title</p>
            					<p>description</p>
            					<p>price</p>
            					<span><i className="far fa-times-circle"></i></span>
            				</div>
            			</li>
            		</ul>
            		<h3>TOTAL PRICE: $2332 </h3>
            	</div>
            </div>
        )
    }

}
export default ShopingCart;