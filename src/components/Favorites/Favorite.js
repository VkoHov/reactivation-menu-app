import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { addToCart } from "../../actions/dishDetailAction";
import { changeData } from "../../actions/rateAction";
import { shoppingCartPlusAction } from "../../actions/shoppingCartAction";
import _ from "lodash";

class Favorites extends Component {
  state = {};

  SaveDataToSessionStorage = info => {
    let infoArr = JSON.parse(sessionStorage.getItem("dishInfo"));

    if (infoArr) {
      let dishArr = [info];
      let array = infoArr.concat(dishArr);
      console.log("chertov array", array);

      sessionStorage.setItem("dishInfo", JSON.stringify(array));
    } else {
      sessionStorage.setItem("dishInfo", JSON.stringify([info]));
    }
  };
  render() {
    let userId = this.props.auth.uid;

    let favorites =
      (this.props.firestoreInfo &&
        this.props.firestoreInfo[userId] &&
        this.props.firestoreInfo[userId].favorites) ||
      null;
    console.log("afef", favorites);

    return (
      (!this.props.auth.uid && <Redirect to="/login" />) || (
        <div>
          <div>MY FAVORITES</div>
          {favorites &&
            favorites.map((dish, index) => {
              let info = {
                count: dish.count,
                description: dish.description,
                title: dish.title,
                url: dish.url,
                // id: dish.id,
                price: dish.price,
                doneness: dish.favdoneness,
                ingredient: dish.favIngredient || null
              };

              return (
                <div key={index}>
                  <p>
                    {dish.favoriteDish ? dish.favoriteDish.title : dish.title}
                  </p>
                  <p>
                    {dish.favoriteDish
                      ? dish.favoriteDish.description
                      : dish.description}
                  </p>
                  <p>
                    {" "}
                    {dish.favoriteDish &&
                    dish.favoriteDish.doneness.length !== 0
                      ? dish.favoriteDish.doneness
                      : dish.favdoneness}
                  </p>
                  <p>
                    {" "}
                    {dish.favoriteDish &&
                    dish.favoriteDish.ingredients.length !== 0
                      ? "With" + dish.favoriteDish.ingredients
                      : dish.favIngredient}
                  </p>
                  <p>Price: {info.price}</p>
                  <button
                    onClick={() => {
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
                          if (
                            item.url === info.url &&
                            _.isEqual(
                              _.sortBy(item.ingredient),
                              _.sortBy(info.ingredient)
                            ) &&
                            _.isEqual(
                              _.sortBy(item.doneness),
                              _.sortBy(info.doneness)
                            )
                          ) {
                            count++;
                          }
                        });
                        if (count === 0) {
                          this.props.addToCart(info);
                          console.log("ifna mtnum");
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
                        console.log("elsena mtnum");
                        this.SaveDataToSessionStorage(info);
                        this.props.shoppingCartPlusAction(shopCartCount);
                        sessionStorage.setItem(
                          "shoppingCartCount",
                          JSON.stringify({ count: 1 })
                        );
                      }
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              );
            })}
        </div>
      )
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    firestoreInfo: state.firestore.data.users,
    shoppingCartCount: state.shoppingCart.shoppingCartCount
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeData: project => dispatch(changeData(project)),
    addToCart: dishInfo => dispatch(addToCart(dishInfo)),

    shoppingCartPlusAction: count => {
      dispatch(shoppingCartPlusAction(count));
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
