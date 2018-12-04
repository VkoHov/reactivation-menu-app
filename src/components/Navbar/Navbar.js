import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountLayout from '../Layout/AccountLayout/AccountLayout'
import './Navbar.css';
import {connect} from 'react-redux';
import {SlideToComponent} from '../../actions/navbarAction';
class Navbar extends Component {
     constructor(props){
         super(props)
     this.state = {
            count:  JSON.parse(sessionStorage.getItem('dishInfo')),
        }
     }
  render() {
    let storage = JSON.parse(sessionStorage.getItem("shoppingCartCount"));
    console.log("storage.count",storage && storage.count) ;
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
                                <AccountLayout/>
                                <Link to="/favorites"><i className="far fa-heart"></i></Link>
                                <Link to="/shoppingcart"><i className="fas fa-shopping-cart"><p>{
                            
                                storage && storage.count || null
                          
                           
                                }</p></i></Link>
                                

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
    }
}
const  mapDispatchToProps = dispatch => {
    return {
        SlideToComponent: (sliderId) => {dispatch(SlideToComponent(sliderId))},
      
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);