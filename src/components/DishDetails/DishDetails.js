import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from 'react-router-dom';
import { compose } from "redux";
import { changeData } from "../../actions/rateAction";
import { addToCart } from "../../actions/dishDetailAction";
import "./DishDetails.css";


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
                mouseOnWidth: e.clientX - e.currentTarget.offsetLeft - 200 + 20 - (e.clientX - e.currentTarget.offsetLeft - 200) % 20,


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
            this.setState({
                ingredients: this.state.ingredients.concat(selectedIng),
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
            ingredients: [e.target.value],
        });
    };

    render() {
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
            <section className="dishDetails">
                <div className="pop-Up-inner">
                    <div>
                        <div>
                            <img src={this.props.dish.dish.url} alt="dish" />
                        </div>
                        <div className="socIcon">
                            <Link to="">
                                <i className="fab fa-facebook-square"></i>
                                <span> facebook </span>
                            </Link>
                            <Link to="">
                                <i className="fab fa-instagram"></i>
                                <span> instagram</span>
                            </Link>
                            <Link to="">
                                <i classame="fab fa-twitter"></i>
                                <span> twitter</span>
                            </Link>
                        </div>
                    </div>
                    <div>
                    <div
                        className="rating-container"
                        style={{ right: "0" }}

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
                        <div className="rating" style={{ width: width }} />
                        <div className="star-container">
                        <img className="star" alt="star" src={this.state.starUrl}/>
                        <img className="star" alt="star" src={this.state.starUrl}/>
                        <img className="star" alt="star" src={this.state.starUrl}/>
                        <img className="star" alt="star" src={this.state.starUrl}/>
                        <img className="star" alt="star" src={this.state.starUrl}/>
                    </div>


                </div> 

            
               
                  
                        <h4>{dishTitile} </h4>
                        <p className="decs">{dish && dish[0].description}</p>
                        <h4 className="price">${dishPrice}</h4>
                        <h5>Choose your Ingredients</h5>
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

                        <h5>Doneness</h5>
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
                            <option value="Select Value" style={{ display: "none" }} disabled>
                                Select Level
                             </option>
                        </select>  
                        <div className="addBlock">
                            
                        <Quantity count={this.state.count} price={dishPrice} />
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

                    </div>

              </div>
            </section >
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
        { collection: "dishes" }
    ])
)(DishDetails);
