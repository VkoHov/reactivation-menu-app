import React from "react";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {changeData} from "../../actions/rateAction";
import {addToCart} from "../../actions/dishDetailAction";
import "./DishDetails.css";
import Quantity from "../Quantity/Quantity";

class DishDetails extends React.Component {
    state = {
        mouseOnWidth: 0,
        isRated: false,
        doneness: null,
        count: 1,
        ingredients: null,
        starUrl:
            "https://firebasestorage.googleapis.com/v0/b/menu-app-d88b1.appspot.com/o/star.png?alt=media&token=361e13d4-7882-4400-90f1-b72278a8a382"
    };
    countRating = e => {

        if (!this.state.isRated) {
            this.setState({
                mouseOnWidth: e.clientX - e.currentTarget.offsetLeft - 200 + 20 - (e.clientX - e.currentTarget.offsetLeft - 200) % 20,


            });
        }
    };

    onClickToStars(e) {
        this.setState({
            isRated: true
        });

        this.props.changeData({
            rating:
                (this.state.mouseOnWidth * 100) / e.currentTarget.offsetWidth / 20,
            id: this.props.dishInfo.dish.id
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
        this.setState({
            ingredients: e.target.value
        });
    };

    SaveDataToSessionStorage = (info) => {
        let infoArr = JSON.parse(sessionStorage.getItem('dishInfo'));

        if (infoArr) {
            let dishArr = [info];
            let array = infoArr.concat(dishArr);

            sessionStorage.setItem('dishInfo', JSON.stringify(array))

        } else {
            sessionStorage.setItem('dishInfo', JSON.stringify([info]))
        }


    }

    selectAll = e => {
        this.setState({
            ingredients: e.target.value
        });
    };

    render() {
        console.log('gago',this.props)
        const id = this.props.dish.dish.id;

        const dish = this.props.dishes
            ? this.props.dishes.filter(dish => {
                return id === dish.id;
            })
            : null;
        const dishTitile = dish ? dish[0].title : null;
        const dishPrice = dish ? dish[0].price : null;
        const dishDescription = dish ? dish[0].description : null;
        let rates = dish
            ? dish[0].rating.reduce(function (a, b) {
            return a + b;
        }) / dish[0].rating.length
            : 0;
        let info = {
            id: id,
            title: dishTitile,
            price: dishPrice,
            doneness: this.state.doneness,
            ingredient: this.state.ingredients,
            count: this.state.count,
            description: dishDescription,
            rating: rates,
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
            <div className="pop-Up-inner">
                <div>Title: {dishTitile} </div>
                <div>Description: {dish && dish[0].description}</div>
                <div
                    className="rating-container"
                    style={{left: "70%"}}
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
                    <div>Rating: {Math.round(parseFloat(rates / 20) * 100) / 100}</div>
                    <div className="rating" style={{width: width}}/>
                    <div className="star-container">
                        <img className="star" alt="star" src={this.state.starUrl}/>
                        <img className="star" alt="star" src={this.state.starUrl}/>
                        <img className="star" alt="star" src={this.state.starUrl}/>
                        <img className="star" alt="star" src={this.state.starUrl}/>
                        <img className="star" alt="star" src={this.state.starUrl}/>
                    </div>


                </div>
                <div> Unit Price: {dishPrice} (AMD)</div>
                <Quantity count={this.state.count} price={dishPrice}/>

                <div>
                    <button type="button" className="add-to-cart-button"
                            onClick={() => {
                                this.props.addToCart(info);
                                console.log(info);
                                this.SaveDataToSessionStorage(info)
                            }}
                    > Add to cart
                    </button>
                    <button type="button" className="add-to-favorites">
                        Add to favorites
                    </button>
                </div>

                <div>Doneness:</div>
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
                    <option value="Select Value" style={{display: "none"}} disabled>
                        Select Level
                    </option>
                </select>
                <p>Choose Ingredient</p>
                <div>
                    {ingredients.map((ingredient, index) => {
                        return (
                            <label key={index}>
                                <input
                                    className="select-checkbox ingredients-drop-down"
                                    type="checkbox"
                                    value={ingredient}
                                    onChange={this.changeIngredient}
                                />
                                {ingredient}
                            </label>
                        );
                    })}
                    <label>
                        <input
                            type="checkbox"
                            className="select-checkbox"
                            value={ingredients}
                            onChange={this.selectAll}
                        />
                        Select All
                    </label>
                </div>
                <img src={this.props.dish.dish.url} alt="dish"/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dishes: state.firestore.ordered.dishes
    };
};
const mapDispatchToProps = dispatch => {
    return {
        changeData: project => dispatch(changeData(project)),
        addToCart: dishInfo => dispatch(addToCart(dishInfo))
    };
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: "dishes"}
    ])
)(DishDetails);
