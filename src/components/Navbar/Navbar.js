import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountLayout from '../Layout/AccountLayout/AccountLayout'
import './Navbar.css';
import {connect} from 'react-redux';
import {SlideToComponent} from '../../actions/navbarAction'

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
                                <p id='ourmenu' onClick={(e) => {this.props.SlideToComponent(e.target.id)}}>our menu</p>
                                <span>|</span>
                                <p id='reservation' onClick={(e) => {this.props.SlideToComponent(e.target.id)}}>reservation</p>
                                <span>|</span>
                                <p id='contact' onClick={(e) => {this.props.SlideToComponent(e.target.id)}}>contact</p>
                                <span>|</span>
                                <p id='aboutus' onClick={(e) => {this.props.SlideToComponent(e.target.id)}}>about</p>
                            </div>
                            <div className="layout">
                                <AccountLayout/>
                                <Link to=""><i className="far fa-heart"></i></Link>
                                <Link to=""><i className="fas fa-shopping-cart"></i></Link>
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