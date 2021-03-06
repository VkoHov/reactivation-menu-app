import React, {Component} from "react";
import {connect} from "react-redux";
import Quantity from "../Quantity/Quantity";
import {Link} from "react-router-dom";
import Status from "../Status/Status";
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
    removeAll =()=> {
        sessionStorage.setItem("dishInfo", null);
        sessionStorage.setItem("shoppingCartCount",JSON.stringify(null));
        this.props.shoppingCartMinusAction(null);
    }

    updateCount(newCount) {
        this.setState({
            count: newCount,
        })

    }

    render() {
        let dishInfo = JSON.parse(sessionStorage.getItem("dishInfo"));
        let totalPirce = 0;
        if (dishInfo) {
            return (
                <div className="shoppingCart">
                    <div className=" shoppingBaner">
                        <div className='  shoppigShape'></div>
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
                                                {dish.ingredient.length ? <p><em>Ingrediengts:</em> {dish.ingredient}</p>: null}
                                                {dish.doneness? <p><em>Doneness:</em> {dish.doneness}</p>: null}
                                                
                                                
                                                <p>
                                                    <span
                                                        onClick={() => {
                                                            let dishes = JSON.parse(sessionStorage.getItem("dishInfo"));
                                                            let storageCount = JSON.parse(sessionStorage.getItem("shoppingCartCount"));
                                                            let shopCartCount = this.props.shoppingCartCount;
                                                            shopCartCount--;
                                                            let disharr = dishes.filter(item => {
                                                                return (
                                                                    (item.ingredient !== dish.ingredient &&
                                                                        item.ingredient.length !== dish.ingredient.length) ||
                                                                    item.doneness !== dish.doneness ||
                                                                    (item.title !== dish.title && item)
                                                                );
                                                            });

                                                            if (disharr.length === 0) {
                                                                sessionStorage.setItem("dishInfo", null);
                                                                this.props.shoppingCartMinusAction(shopCartCount);
                                                                sessionStorage.setItem("shoppingCartCount",JSON.stringify(null));
                                                            } else {
                                                                sessionStorage.setItem("dishInfo",JSON.stringify(disharr));
                                                                this.props.shoppingCartMinusAction(shopCartCount);
                                                                storageCount.count--;

                                                                sessionStorage.setItem("shoppingCartCount",JSON.stringify({ count: storageCount.count }));


                                                            }
                                                            this.removeDish();
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
                                    <p> Total Price <span>AMD {totalPirce}</span></p>
                                    {this.state.popUpIsOpen && <div onClick={(e) => {
                                        e.stopPropagation()
                                    }}><Status  remove = {this.removeAll} dish={dishInfo} totalPirce = {totalPirce}/></div>}
                                </div>
                            </div>
                           
                            <p className="orderButton">
                                <button onClick ={this.removeAll}>Remove All</button> 
                                <button onClick={this.showPopUp}>Order Now</button>
                            </p>
                        </div>
                    </section>

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

        shoppingCartMinusAction: count => { dispatch(shoppingCartMinusAction(count));
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