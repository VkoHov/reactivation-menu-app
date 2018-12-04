import React, {Component} from "react";
import {connect} from "react-redux";
import Quantity from "../Quantity/Quantity";
import {Link} from "react-router-dom";
import Status from "../Status/Status";
import Footer from "../Homepage/Footer/Footer";
import {shoppingCartMinusAction} from "../../actions/shoppingCartAction"
import './ShoppingCart.css';

class ShoppingCart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            removed: false,
            count: null,
            popUpIsOpen: false,
        };
        this.showPopUp = this.showPopUp.bind(this);
    }

    showPopUp = () => {
        this.setState({
            popUpIsOpen: !this.state.popUpIsOpen,
        })
    }

    removeDish() {
        this.setState({
            removed: !this.state.removed
        });
    }

    updateCount(newCount) {
        this.setState({
            count: newCount,
        })

    }

    render() {
        let dishInfo = JSON.parse(sessionStorage.getItem("dishInfo"));
        console.log(dishInfo)
        let totalPirce = 0;
        if (dishInfo) {
            return (
                <div className="shoppingCart">
                    <div className="paddingTop shoppingBaner">
                        <div className='shoppigShape'></div>
                    </div>

                    <div className="container">
                        <div className="source">
                            <p>
                                <Link to="/">Home</Link>
                                <span>/</span>
                                my cart
                            </p>
                        </div>
                        <h2>my <span>cart</span></h2>
                        <div className="shopTable">
                            <div className="shopingDish"></div>
                            <div className="shopDish">
                                <p>quantity</p>
                            </div>
                            <div className="shopDish">
                                <p>unit price</p>
                            </div>
                            <div className="shopDish">
                                <p>SUBTOTAL</p>
                            </div>
                        </div>
                    </div>
                    <section className="shopingList">
                        <div className="container">

                            {dishInfo.map((dish, index) => {
                                totalPirce += dish.count * dish.price;

                                return (
                                    <div className="shopTable" key={index}>
                                        <div className="shopingDish">
                                            <div>
                                                <img src={dish.url} alt={dish.title}/>
                                            </div>
                                            <div>
                                                <h3>{dish.title}</h3>
                                                <p>{dish.description}</p>
                                                <p><em>Ingrediens:</em> {dish.ingredient.join(" , ")}</p>
                                                <p><em>Doneness:</em> {dish.doneness}</p>
                                                <p><em>Rating:</em> {dish.rating}</p>
                                                <p>
                                                    <span>edit</span>
                                                    <span>Favorit</span>
                                                    <span
                                                        onClick={() => {
                                                            this.removeDish();
                                                            let dishes = JSON.parse(sessionStorage.getItem("dishInfo"));

                                                            let disharr = dishes.filter(item => {
                                                                return (
                                                                    (item.ingredient !== dish.ingredient &&
                                                                        item.ingredient.length !== dish.ingredient.length) ||
                                                                    item.doneness !== dish.doneness ||
                                                                    (item.id !== dish.id && item)
                                                                );
                                                            });

                                                            if (disharr.length === 0) {
                                                                sessionStorage.setItem("dishInfo", null);
                                                            } else {
                                                                sessionStorage.setItem(
                                                                    "dishInfo",
                                                                    JSON.stringify(disharr)
                                                                );
                                                            }
                                                        }}>Remove </span>

                                                </p>

                                            </div>

                                        </div>
                                        <div className="shopDish quant">
                                            <Quantity update={this.updateCount.bind(this)} index={index}
                                                      count={dish.count} price={dish.price}/>
                                        </div>
                                        <div className="shopDish price">
                                            <p>AMD {dish.price}</p>
                                        </div>
                                        <div className="shopDish subtot">
                                            <p>AMD {dish.count * dish.price}</p>
                                        </div>

                                    </div>
                                );
                            })}

                            <div className="total">
                                <div>
                                    <p>Price <span>AMD {totalPirce}</span></p>
                                    <p>Delivery <span>AMD 500</span></p>
                                    <p>Total Price <span>AMD {totalPirce + 500}</span></p>
                                    {this.state.popUpIsOpen && <div onClick={(e) => {
                                        e.stopPropagation()
                                    }}><Status dish={dishInfo}/></div>}
                                </div>
                            </div>
                            <p className="orderButton">
                                <button onClick={this.showPopUp}>Order Now</button>
                            </p>
                        </div>
                    </section>
                    <Footer/>

                </div>
            );
        } else {
            return (
                <div className="emptyCart">
                    SHOPPING CART IS EMPTY TO ADD SOMETHING CLICK{" "}
                    <Link to="/listing">HERE</Link>
                </div>
            );
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {

        shoppingCartMinusAction: count => {
            dispatch(shoppingCartMinusAction(count));
        }
    };
};
const mapStateToProps = state => {
    return {
        dishInfo: state,
        shoppingCartCount: state.shoppingCart.shoppingCartCount,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
