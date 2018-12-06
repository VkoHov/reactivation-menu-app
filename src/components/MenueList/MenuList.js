import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from 'react-router-dom';
import Dish from './Menu/Menu';

class MenuList extends Component {

    render() {

        return (
            <div>
                {
                    this.props.categories && 
                    this.props.categories[0].categories.map((category,index) => {

                        return category !== 'all menu' && (
                            <div key={index} >
                                <h2 > {category}</h2>
                                    {
                                        this.props.dishes && this.props.dishes.map(dish  =>{
                                           return dish.category===category && <Dish key={dish.id}  dish={dish}/>;
                                        })
                                    }
                                
                            </div>
                        );
                    })
                }
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
