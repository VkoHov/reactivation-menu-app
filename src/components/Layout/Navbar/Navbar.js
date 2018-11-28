import React, { Component } from 'react';
import AccountLayout from '../AccountLayout/AccountLayout';
import {Link} from 'react-router-dom';


import './Navbar.css';
class Navbar extends Component{
    render(){
        return(
            <nav>
        		<div className="container">
        			<div className="navbar">
	            		<Link className="logo" to="/">Steak <span>&</span> Grill</Link>
            		<div className="menu">
            		
	            			<Link to="">home</Link>
	            			<span>|</span>
	            			<Link to="">our menu</Link>
	            			<span>|</span>
	            			<Link to="">reservation </Link> 
	            			<span>|</span>
	            			<Link to="">contact</Link>
	            			<span>|</span>
	            			<Link to="">about</Link>
	            		</div>
	            		<div className="layout">
	            			<Link to="/login"><i className="far fa-user"></i></Link>
	            			<Link to=""><i className="far fa-heart"></i></Link>
	            			<Link to="/shoppingcart"><i className="fas fa-shopping-cart"></i></Link>
	            		</div>
	            	</div>
            	</div>
               
            </nav>
        )
    }

}
export default Navbar;