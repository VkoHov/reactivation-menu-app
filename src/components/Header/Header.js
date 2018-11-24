import React, { Component } from 'react';
import Navbar from '../Layout/Navbar/Navbar'
import './Header.css';

class Header extends Component {
    render() {
        return (
        		<header>
	                <div>
	                    <Navbar/>
	                    <div className="indicators">
		                    <span className="active"></span>
		                    <span></span>
		                    <span></span>
	                    </div>
	                </div>
	            </header>
        )
    }
}
export default Header;