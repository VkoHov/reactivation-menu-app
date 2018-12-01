import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from 'react-router-dom';
import Dish from './Menu/Menu';


class MenuList extends Component {

    render() {
        console.log('esi admin manui propsnakjguyi', this.props.dishes);

        let saladArr = [];
        let burgerArr = [];
        let grillArr = [];
        let wurstArr = [];
        let drinkArr = [];
        let steaksArr = [];

        this.props.dishes && this.props.dishes.map(dish => {
            if (dish.category === 'sallads') {
                saladArr.push(dish);
            }
            if (dish.category === 'burger') {
                burgerArr.push(dish);
            }
            if (dish.category === 'wurst'){
                wurstArr.push(dish);
            }
            if(dish.category === 'grill'){
                grillArr.push(dish);
            }
            if(dish.category === 'drinks'){
                drinkArr.push(dish);
            }
            if(dish.category === 'steaks'){
                steaksArr.push(dish);
            }
        })

        return (
            <div>

                <div>
                    <h2>Sallads</h2>
                    {
                        this.props.dishes && saladArr.map((dish, index) => {
                            return (
                                <Dish key={`${index}1`} dish={dish} />
                            )
                        })
                    }
                </div>
                <div>
                    <h2>Burger</h2>
                    {
                        this.props.dishes && burgerArr.map((dish, index) => {
                            return (
                                <Dish key={`${index}2`} dish={dish} />
                            )
                        })
                    }
                </div>
                <div>
                    <h2>Burger</h2>
                    {
                        this.props.dishes && burgerArr.map((dish, index) => {
                            return (
                                <Dish key={`${index}2`} dish={dish} />
                            )
                        })
                    }
                </div>
                <Link to='/newDish'> <button>Add Dish</button>
                </Link>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        dishes: state.firestore.ordered.dishes,
        categories: state.firestore.ordered.categories,
    }
}

export default compose(connect(mapStateToProps),
    firestoreConnect([
        {
            collection: 'dishes',
        },
        {
            collection: 'categories',
        }
    ])
)(MenuList);
