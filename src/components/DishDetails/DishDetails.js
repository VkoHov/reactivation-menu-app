import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { changeData } from "../../actions/rateAction";
import { addToCart } from "../../actions/dishDetailAction";
import {addFavToFireStore} from "../../actions/addToFavAction";
import _ from "lodash";
import Quantity from '../Quantity/Quantity';
import "./DishDetails.css";
import { shoppingCartPlusAction } from "../../actions/shoppingCartAction";
 

import { Link } from 'react-router-dom'

class DishDetails extends React.Component {
  state = {
    mouseOnWidth: 0,
    isRated: false,
    doneness: null,
    count: 1,
    ingredients: [],
    starUrl:
      "https://firebasestorage.googleapis.com/v0/b/menu-app-d88b1.appspot.com/o/star.png?alt=media&token=361e13d4-7882-4400-90f1-b72278a8a382"
  };
  countRating = e => {
    if (!this.state.isRated) {
      this.setState({
        mouseOnWidth:
          e.clientX -
          e.currentTarget.offsetLeft -
          200 +
          20 -
          ((e.clientX - e.currentTarget.offsetLeft - 200) % 20)
      });
    }
  };
  minusCount = () => {
    if (this.state.count > 1) {
      this.setState({
        count: this.state.count - 1
      });
    }
  };

  plusCount = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  onClickToStars(e) {
    this.setState({
      isRated: true
    });

    this.props.changeData({
      rating:
        (this.state.mouseOnWidth * 100) / e.currentTarget.offsetWidth / 20,
      id: this.props.dish.dish.id
    });
  }

  mouseLeaving() {
    if (!this.state.isRated) {
      this.setState({
        mouseOnWidth: 0
      });
    }
  }

  changeDoneness = e => {
    this.setState({
      doneness: e.target.value
    });
  };
  changeIngredient = e => {
    let selectedIng = [e.target.value];
    if (e.target.checked) {
      this.setState({
        ingredients: this.state.ingredients.concat(selectedIng)
      });
    } else {
      let arr = this.state.ingredients.filter(ingredient => {
        return ingredient !== e.target.value && ingredient;
      });
      this.setState({
        ingredients: arr
      });
    }
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
  addToFavorites =() =>{
    console.log('dish detail',this.state.ingredients);
    console.log("donenes",this.props);
    this.props.addFavToFireStore({
     id: this.props.favorite.uid,
      favdoneness: this.state.doneness ,
      favIngredient: this.state.ingredients,
      count: this.state.count,
      // id: this.props.dish.dish.id,
      title: this.props.dish.dish.title,
      price: this.props.dish.dish.price,
      description: this.props.dish.dish.description,
      url: this.props.dish.dish.url,
   })
  }

  selectAll = e => {
    this.setState({
      ingredients: [e.target.value]
    });
  };

  render() {
    console.log("state", this.props.shoppingCartCount);
    const id = this.props.dish.dish.id;

    const dish = this.props.dishes
      ? this.props.dishes.filter(dish => {
        return id === dish.id;
      })
      : null;
    const dishTitile = dish ? dish[0].title : null;
    const dishPrice = dish ? dish[0].price : null;
    const dishUrl = dish ? dish[0].url : null;
    const dishDescription = dish ? dish[0].description : null;
    let rates;
    if (dish[0].rating.length) {
      rates =
        dish[0].rating.reduce(function (a, b) {
          return a + b;
        }) / dish[0].rating.length;
    }


    let info = {
      id: id,
      title: dishTitile,
      price: dishPrice,
      doneness: this.state.doneness,
      ingredient: this.state.ingredients,
      count: this.state.count,
      description: dishDescription,
      rating: rates,
      url: dishUrl,

    };

    let donenes = [];
    if (dish && dish[0].doneness) {
      donenes = dish[0].doneness;
    }
    let ingredients = [];
    if (dish && dish[0].ingredients) {
      ingredients = dish[0].ingredients;
    }
    rates = 20 * rates;
    let width =
      (this.state.mouseOnWidth && this.state.mouseOnWidth) ||
      (!this.state.mouseOnWidth && rates && rates + "%") ||
      0;

    return (
      <section className="dishDetails" onClick={this.props.closePopup}>
        <div className="pop-Up-inner" onClick={e => e.stopPropagation()}>
          <div>
            <div className="disPhoto"><img src={this.props.dish.dish.url} alt="dishimage" /></div>
            <div className="socIcon">
              <Link to="">
                <i className="fab fa-facebook-square"></i>
                <span>facebook</span>
              </Link>
              <Link to="">
                <i className="fab fa-instagram"></i>
                <span>instagram</span>
              </Link>
              <Link to="">
                <i className="fab fa-twitter"></i>
                <span>twitter</span>
              </Link>
            </div>
          </div>
          <div>
          <div
            className="rating-container"
            style={{ right: "0%" }}
            onMouseMove={e => {
              this.countRating(e);
            }}
            onClick={e => {
              this.onClickToStars(e);
            }}
            onMouseLeave={() => {
              this.mouseLeaving();
            }}
          >
            <div>
              Rating:
              {rates ? Math.round(parseFloat(rates / 20) * 100) / 100 : null}
            </div>
            <div className="rating" style={{ width: width }} />
            <div className="star-container">
              <img className="star" alt="star" src={this.state.starUrl} />
              <img className="star" alt="star" src={this.state.starUrl} />
              <img className="star" alt="star" src={this.state.starUrl} />
              <img className="star" alt="star" src={this.state.starUrl} />
              <img className="star" alt="star" src={this.state.starUrl} />
            </div>
          </div>
            <h4>{dishTitile}</h4>
            <p>{dish && dish[0].description}</p>
            <p className="price">{dishPrice}(AMD) </p>
            <h5>Choose Your Ingredient</h5>
            {dish[0].ingredients.length !== 0 && (
              <div>
                <div className="selIng">
                  {ingredients.map((ingredient, index) => {
                    return (
                      <p key={index}>
                        <label>
                          <input
                            className="select-checkbox ingredients-drop-down"
                            type="checkbox"
                            value={ingredient}
                            onChange={e => this.changeIngredient(e)}
                          />
                          {ingredient}
                        </label>
                      </p>
                    );
                  })}
                  <p>
                    <label>
                      <input
                        type="checkbox"
                        className="select-checkbox"
                        value={ingredients}
                        onChange={this.selectAll}
                      />
                      Select All
                </label>
                  </p>
                </div>
              </div>
            )}
            <h5>Doneness</h5>

            {dish[0].doneness.length !== 0 && (
              <div>
                <select
                  className="doneness-drop-down"
                  onChange={this.changeDoneness}
                  defaultValue="Select Value"
                >
                  {donenes.map((level, index) => {
                    return (
                      <option value={level} key={index}>
                        {level}
                      </option>
                    );
                  })}
                  <option
                    value="Select Value"
                    style={{ display: "none" }}
                    disabled
                  >
                    Select Level
                </option>
                </select>
              </div>
            )}

            <div className="addBlock">
              <div className="countDish">
                <button className="count-button" onClick={this.minusCount}>
                  -
                </button>
                <button className="count-button">{this.state.count}</button>
                <button className="count-button" onClick={this.plusCount}>
                  +
                </button>
              </div>
              <div>
            <button
              type="button"
              className="add-to-cart-button"
              onClick={() => {
                let dishes = JSON.parse(sessionStorage.getItem("dishInfo"));
                let storageCount = JSON.parse(
                  sessionStorage.getItem("shoppingCartCount")
                );
                let shopCartCount = this.props.shoppingCartCount;
                shopCartCount++;
                if (dishes) {
                  let count = 0;
                  dishes.map(item => {
                    if (
                      item.id === info.id &&
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
            >
              Add to cart
            </button>
            <button onClick = {this.addToFavorites} type="button" className="add-to-favorites">
              Add to favorites
            </button>
          </div>

            </div>
          </div>

        </div>
      </section>
    );
  }
}
const mapStateToProps = state => {
  return {
    shoppingCartCount: state.shoppingCart.shoppingCartCount,
    dishes: state.firestore.ordered.dishes,
    favorite:  state.firebase.auth,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeData: project => dispatch(changeData(project)),
    addToCart: dishInfo => dispatch(addToCart(dishInfo)),
    addFavToFireStore: favDishInfo => dispatch(addFavToFireStore(favDishInfo)),
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
  firestoreConnect([{ collection: "dishes" },{collection: "users"}])
)(DishDetails);
