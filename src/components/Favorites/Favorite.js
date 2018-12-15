import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect, Link } from "react-router-dom";
import { compose } from "redux";
import { addToCart } from "../../actions/dishDetailAction";
import { changeData } from "../../actions/rateAction";
import { shoppingCartPlusAction } from "../../actions/shoppingCartAction";
import { removeFromFirestore } from "../../actions/addToFavAction";
import _ from "lodash";
import './Favorites.css';

class Favorites extends Component {

    state = {
        remove: false,
    };

    SaveDataToSessionStorage = info => {
        let infoArr = JSON.parse(sessionStorage.getItem("dishInfo"));

        if (infoArr) {
            let dishArr = [info];
            let array = infoArr.concat(dishArr);

            sessionStorage.setItem("dishInfo", JSON.stringify(array));
        } else {
            sessionStorage.setItem("dishInfo", JSON.stringify([info]));
        }
    };

    removeToggle = () => {

        this.setState({
            remove: !this.state.remove,
        })
    };

    render() {

        let userId = this.props.auth.uid;

        let favorites =
            (this.props.firestoreInfo &&
                this.props.firestoreInfo[userId] &&
                this.props.firestoreInfo[userId].favorites) ||
            null;

        if (favorites && favorites.length !== 0 && this.props.auth.uid) {
            return (
                <section className="favorites">
                    <div className="shoppingCart">
                        <div className=" shoppingBaner">
                            <div className='  shoppigShape'></div>
                        </div>

                        <div className="container">
                            <div className="source">
                                <p>
                                    <Link to="/">Home</Link>
                                    <span>/</span>
                                    my favorites
                            </p>
                            </div>
                            <h2>my <span>favorites</span></h2>

                            {favorites && favorites.map((dish, index) => {
                                    let info = {
                                        count: dish.count,
                                        description: dish.description,
                                        title: dish.title,
                                        url: dish.url,
                                        price: dish.price,
                                        doneness: dish.favdoneness,
                                        ingredient: dish.favIngredient || null
                                    };

                                    return (
                                        <div className="shopingList" key={index}>
                                            <div className="shopTable">
                                                <div className="shopingDish">
                                                    <div className="favImg">
                                                        <img src={info.url} alt={dish.title} />
                                                    </div>
                                                    <div className="favDesc">
                                                        < h3>
                                                            {dish.favoriteDish ? dish.favoriteDish.title : dish.title}
                                                        </h3>
                                                        <p>
                                                            {dish.favoriteDish
                                                                ? dish.favoriteDish.description
                                                                : dish.description}</p>

                                                            {dish.favIngredient.length
                                                                ? <p><em>Ingrediens:</em>  {dish.favIngredient}</p>
                                                                : null}

                                                            {dish.favdoneness
                                                                ?  <p><em>Doneness:</em> {dish.favdoneness}</p>
                                                                : null}
                                                                <p className=" price">Price: {info.price}(AMD)</p>
                                                                </div>
                                                    <div className="favAddBlock">
                                                    <p>   <button className="addtoCart" onClick={() => {

                                                            let dishes = JSON.parse(
                                                                sessionStorage.getItem("dishInfo")
                                                            );
                                                            let storageCount = JSON.parse(
                                                                sessionStorage.getItem("shoppingCartCount")
                                                            );
                                                            let shopCartCount = this.props.shoppingCartCount;
                                                            shopCartCount++;
                                                            if (dishes) {

                                                                let count = 0;
                                                                dishes.map(item => {
                                                                    return (
                                                                        item.url === info.url &&
                                                                        _.isEqual(
                                                                            _.sortBy(item.ingredient),
                                                                            _.sortBy(info.ingredient)
                                                                        ) &&
                                                                        _.isEqual(
                                                                            _.sortBy(item.doneness),
                                                                            _.sortBy(info.doneness)
                                                                        )

                                                                    ) &&
                                                                        count++;
                                                                });
                                                                if (count === 0) {
                                                                    this.props.addToCart(info);
                                                                    this.SaveDataToSessionStorage(info);
                                                                    this.props.shoppingCartPlusAction(shopCartCount);
                                                                    storageCount.count++;
                                                                    sessionStorage.setItem(
                                                                        "shoppingCartCount",
                                                                        JSON.stringify({ count: storageCount.count })
                                                                    );
                                                                }
                                                            } else {

                                                                this.props.addToCart(info);
                                                                this.SaveDataToSessionStorage(info);
                                                                this.props.shoppingCartPlusAction(shopCartCount);
                                                                sessionStorage.setItem(
                                                                    "shoppingCartCount",
                                                                    JSON.stringify({ count: 1 })
                                                                );

                                                            }
                                                        }}
                                                        > Move To Cart</button>
                                                        </p>
                                                        <p>   <button className="addtoCart" onClick={() => {

                                                            let favorites = this.props.firestoreInfo[userId].favorites;
                                                            let filteredFavs = favorites.filter((favorite) => {
                                                                return favorite.title !== info.title
                                                            })
                                                            this.props.removeFromFirestore({
                                                                filteredFavs,
                                                                id: userId,
                                                            });
                                                            this.removeToggle();
                                                        }}>Remove</button>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>

                    </div>
                </section>
            );
        } else if (!this.props.auth.uid) {
            return (
                <Redirect to="/login" />
            )
        } else {
            return (
                <div className="emptyCart">
                    YOUR FAVORITE LIST IS EMPTY YET,TO ADD FAVORITE DISHES CLICK{" "}
                    <Link to="/">HERE</Link>
                </div>
            )
        }
    }
}
const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        firestoreInfo: state.firestore.data.users,
        shoppingCartCount: state.shoppingCart.shoppingCartCount,
        firestore: state.firestore,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        changeData: project => dispatch(changeData(project)),
        addToCart: dishInfo => dispatch(addToCart(dishInfo)),
        removeFromFirestore: info => dispatch(removeFromFirestore(info)),
        shoppingCartPlusAction: count => {dispatch(shoppingCartPlusAction(count));
        }
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect([{ collection: "users" }, { collection: "dishes" }])
)(Favorites);