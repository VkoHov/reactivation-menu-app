import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Dish from './Dish/Dish';
import './DishList.css';


class DishList extends Component {

    render() {
        console.log("dish List", this.props);
        let dishes = this.props.dishes && this.props.dishes;
        let allDish = [];

        if (this.props.categoryName !== 'all menu') {
            for (let i = 0; i < dishes.length; i++) {
                console.log('diqsjhagfjksgaj',dishes);
                if (dishes[i].category === this.props.categoryName) {
                    allDish.push(dishes[i]);
                }
            }
        } else {
            allDish = dishes;
        }
        return (
            <section  className="dishList">
             
                <div  className="container">
                    <div className="source">
                        <p>
                            <Link to="/">Home</Link>
                            <span>/</span>
                            {this.props.categoryName}
                        </p>
                        <p>18 of 125</p>
                    </div>
                <div className='dishes'>
                    {
                        allDish &&
                        allDish.map((dish, index) => <Dish key={dish.id} dish={dish} />)
                    }
                </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        dishes: state.firestore.ordered.dishes,
        categoryName: state.listing.categoryName,
    }

}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'dishes' }
    ]),
)(DishList);



