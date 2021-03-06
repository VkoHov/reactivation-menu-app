import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountLayout from '../Layout/AccountLayout/AccountLayout';
import {compose} from 'redux';
import './Navbar.css';
import { connect } from 'react-redux';
import { SlideToComponent } from '../../actions/navbarAction';
import { firestoreConnect } from 'react-redux-firebase';

// import ReactSVG from 'react-svg';
class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: JSON.parse(sessionStorage.getItem('dishInfo')),
        }
    }

    render() {
        let userId = this.props.auth.uid;
        
        let storage = JSON.parse(sessionStorage.getItem("shoppingCartCount"));
        return (
            <header>
                <nav>
                    <div className="container">
                        <div className="navbar">
                            <Link className="logo" to="/">Steak <span>&</span> Grill</Link>

                            <div className="menu">
                                {window.location.pathname !== '/' ?
                                    <Link to="/">home</Link> :
                                    <p className='navItem' id='home' onClick={(e) => {
                                        this.props.SlideToComponent(e.target.id)
                                    }}>home</p>
                                }

                                <span>|</span>
                                {window.location.pathname !== '/' ?
                                    <Link to="/"> our  menu</Link> :
                                    <p className='navItem' id='ourmenu' onClick={(e) => {
                                        this.props.SlideToComponent(e.target.id)
                                    }}>our  menu</p>
                                }

                                <span>|</span>

                                {window.location.pathname !== '/' ?
                                    <Link to="/"> reservation</Link> :

                                    <p className='navItem' id='reservation' onClick={(e) => {
                                        this.props.SlideToComponent(e.target.id)
                                    }}>reservation</p>
                                }

                                <span>|</span>

                                {window.location.pathname !== '/' ?
                                    <Link to="/"> about</Link> :
                                    <p className='navItem' id='aboutus' onClick={(e) => {
                                        this.props.SlideToComponent(e.target.id)
                                    }}>about</p>
                                }

                                <span>|</span>

                                {window.location.pathname !== '/' ?
                                    <Link to="/"> contact</Link> :
                                    <p className='navItem' id='contact' onClick={(e) => {
                                        this.props.SlideToComponent(e.target.id)
                                    }}>contact</p>
                                }
                            </div>
                            <div className="layout">
                                <AccountLayout />

                                {this.props.info && this.props.info[userId] && this.props.info[userId].favorites.length?
                                <Link to="/favorites"><i className="fas fa-heart"></i> </Link>: 
                                <Link to="/favorites"><i className="far fa-heart"></i></Link>}
                               
                                <Link to="/shoppingcart" className="cartIcon"><i className="fas fa-shopping-cart">
                                    {storage && <span>{(storage.count)}</span>}
                                </i></Link>



                            </div>
                        </div>
                    </div>

                </nav>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        shoppingCartCount: state.shoppingCart.shoppingCartCount,
        auth: state.firebase.auth,
        info: state.firestore.data.users,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        SlideToComponent: (sliderId) => dispatch(SlideToComponent(sliderId)),
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{collection :"users"}]),
)(Navbar);