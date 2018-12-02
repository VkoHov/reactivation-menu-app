import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountLayout from '../Layout/AccountLayout/AccountLayout'
import './Navbar.css';
import {connect} from 'react-redux';
import {SlideToComponent} from '../../actions/navbarAction';
import FavoriteLayout from '../Layout/FavoriteLayout/FavoriteLayout';
import CartLayout from '../Layout/CartLayout/CartLayout';

class Navbar extends Component {
    render() {
        return (
            <header>
                <nav>
                    <div className="container">
                        <div className="navbar">
                            <Link className="logo" to="/">Steak <span>&</span> Grill</Link>
                            <div className="menu">

                                <Link to="/">home</Link>
                                <span>|</span>
                                <p className='navItem' id='ourmenu' onClick={(e) => {this.props.SlideToComponent(e.target.id)}}>our menu</p>
                                <span>|</span>
                                <p  className='navItem'id='reservation' onClick={(e) => {this.props.SlideToComponent(e.target.id)}}>reservation</p>
                                <span>|</span>
                                <p  className='navItem'id='aboutus' onClick={(e) => {this.props.SlideToComponent(e.target.id)}}>about</p>
                                <span>|</span>
                                <p  className='navItem'id='contact' onClick={(e) => {this.props.SlideToComponent(e.target.id)}}>contact</p>
                            </div>
                            <div className="layout">
                                <AccountLayout />
                                <FavoriteLayout />
                                <CartLayout />
                            </div>
                        </div>
                    </div>

                </nav>
            </header>
        )
    }
}

const  mapDispatchToProps = dispatch => {
    return {
        SlideToComponent: (sliderId) => {dispatch(SlideToComponent(sliderId))}
    }
}
export default connect(null, mapDispatchToProps)(Navbar);