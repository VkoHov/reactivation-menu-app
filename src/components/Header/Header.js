import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
                <div className="slider">
                    <div className="indicators">
	                    <span className="active"></span>
	                    <span></span>
	                    <span></span>
                    </div>
                </div>
	           
        )
    }
}
export default Header;