import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CartLayout.css';

class CartLayout extends Component {

    render() {
        return (
            <div className="cartLayout">
                <p className='cartIcon'>
                    <Link to="/shoppingcart"><i className="fas fa-shopping-cart"></i></Link>
                    <span>0</span>
                </p>
                <div >
                    <p>shopping cart</p>

                </div>
            </div>
        )
    }
}


export default CartLayout;