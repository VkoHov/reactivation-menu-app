import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux';
import {changeData} from '../../actions/rateAction';
import {addToCart} from '../../actions/dishDetailAction';
import '../DishDetails/DishDetails.css';


class DishDetails extends React.Component {
    state = {
        mouseOnWidth: 0,
        isRated: false,
        doneness: null,
        count: 1,
        ingredients: null,
        starUrl: 'https://firebasestorage.googleapis.com/v0/b/menu-app-d88b1.appspot.com/o/star.png?alt=media&token=361e13d4-7882-4400-90f1-b72278a8a382',

    }
    countRating = (e) => {
        if (!this.state.isRated) {
            this.setState({
                mouseOnWidth: e.clientX - e.currentTarget.offsetLeft,
            })
        }

    }

    onClickToStars(e) {
        this.setState({
            isRated: true,

        });
        this.props.changeData(((this.state.mouseOnWidth * 100) / e.currentTarget.offsetWidth) / 20);
    }

    mouseLeaving() {
        if (!this.state.isRated) {
            this.setState({
                mouseOnWidth: 0,
            })
        }
    }

    changeDoneness = (e) => {

        this.setState({
            doneness: e.target.value,

        })

    };
    changeIngredient = (e) => {

        this.setState({
            ingredients: e.target.value,
        })
    };
    minusCount = (e) => {


        if (this.state.count > 1) {
            this.setState({
                count: this.state.count - 1,
            });

        }
    };

    plusCount = () => {
        this.setState({
            count: this.state.count + 1,
        })
    };

    selectAll = (e) => {
        this.setState({
            ingredients: e.target.value,
        })
    }

    render() {
        const id = 'mRgxS1gcHOD9fNm3M9uj';
        const dish = this.props.dishes ? this.props.dishes.filter((dish) => {
            return id === dish.id
        }) : null;
        const dishTitile = dish ? dish[0].title : null;
        const dishPrice = dish ? dish[0].price * this.state.count : null;


        let info = {
            title: dishTitile,
            price: dishPrice,
            doneness: this.state.doneness,
            ingredient: this.state.ingredients,
            count: this.state.count,
        };

        let rates = dish
            ? dish[0].rating.reduce(function (a, b) {
            return (a + b)
        }) / (dish[0].rating.length) : 0;

        let donenes = [];
        if (dish && dish[0].doneness) {
            donenes = dish[0].doneness
        }
        ;
        let ingredients = [];
        if (dish && dish[0].ingredients) {
            ingredients = dish[0].ingredients
        }
        rates = 20 * rates;
        let width = (this.state.mouseOnWidth && this.state.mouseOnWidth)
            || (!this.state.mouseOnWidth && rates && rates + '%') || 0;
        return (
            <div>
                <div>Title: {dishTitile} </div>
                <div>Description: {dish && dish[0].description}</div>


                <div>Price: {dishPrice}</div>
                <div>
                    <button type='button' className='add-to-cart-button' onClick={() => {
                        this.props.addToCart(info);
                    }}>Add to cart
                    </button>
                    <button type='button' className='add-to-favorites'>Add to favorites</button>
                </div>

                <div>Doneness:</div>
                <select className="doneness-drop-down" onChange={this.changeDoneness} defaultValue="Select Value">

                    {
                        donenes.map((level, index) => {
                            return (
                                <option value={level} key={index}>{level}</option>
                            )
                        })
                    }
                    <option value="Select Value" style={{display: "none"}} disabled>Select Level</option>
                </select>
                <p>Choose Ingredient</p>
                <div>
                    {
                        ingredients.map((ingredient, index) => {
                            return (
                                <label key={index}>
                                    <input className="select-checkbox ingredients-drop-down" type="checkbox" value={ingredient}
                                           onChange={this.changeIngredient}/>
                                    {ingredient}
                                </label>

                            )
                        })
                    }
                    <label>
                        <input type="checkbox" className="select-checkbox" value={ingredients}
                               onChange={this.selectAll}/>
                        Select All
                    </label>
                </div>

                <button className="count-button" onClick={this.minusCount}>-</button>
                <button className="count-button">{this.state.count}</button>
                <button className="count-button" onClick={this.plusCount}>+</button>
                <div>Rating:</div>
                <div className="rating-container" style={{left: '100px'}} onMouseMove={(e) => {
                    this.countRating(e)
                }}
                     onClick={(e) => {
                         this.onClickToStars(e)
                     }}
                     onMouseLeave={() => {
                         this.mouseLeaving()
                     }}>
                    <div className="rating" style={{width: width}}></div>
                    <div className="star-container">
                        <img className="star" alt='ghsad' src={this.state.starUrl}/>
                        <img className="star" alt='ghsad' src={this.state.starUrl}/>
                        <img className="star" alt='ghsad' src={this.state.starUrl}/>
                        <img className="star" alt='ghsad' src={this.state.starUrl}/>
                        <img className="star" alt='ghsad' src={this.state.starUrl}/>
                    </div>
                </div>
                <img className="dish-image" alt='ghsad' src={dish && dish[0].image}/>

            </div>


        );
    }
}

const mapStateToProps = (state) => {

    return {
        dishes: state.firestore.ordered.dishes
    }

}
const mapDispatchToProps = dispatch => {
    return {
        changeData: (project) => dispatch(changeData(project)),
        addToCart: (dishInfo) => dispatch(addToCart(dishInfo)),
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
        collection: 'dishes'
    }])
)(DishDetails);
















