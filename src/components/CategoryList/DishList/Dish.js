import React, { Component } from 'react';

class Dish extends Component {
    render() {
    let style = { backgroundImage: `url(${this.props.dish.url})`}
console.log('dish',this.props.dish.url)
        return (
            <div>
                <div className="dishBlock" style={style}>
               		<div className="shape">
	               		<p><i className="fas fa-utensils"></i></p>
               		</div>
           		</div>
           		<h5>{this.props.dish.title}
           			<p>
           				<span><i className="far fa-heart"></i></span>
           				<span><i className="fas fa-shopping-cart"></i></span>
           			</p>
           		</h5>

           		<p>{this.props.dish.description}</p>
           		<p className="price">${this.props.dish.price}</p>
            </div>
           
        );
    }
}
export default Dish;