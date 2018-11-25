import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Dish from './Dish';



class DishList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let dishes = this.props.dishes && this.props.dishes;
        let allDish = [];
        if (this.props.categoryName !== 'all') {
            for (let i = 0; i < dishes.length; i++) {
                if (dishes[i].category === this.props.categoryName) {
                    allDish.push(dishes[i]);
                }
            }

        } else {
          
            allDish=dishes;
        }

        return (
            <section className="dishList">
                <div className="container">
                {
                    allDish &&
                    allDish.map((dish, index) => <Dish key={dish.id} dish={dish} />)
                }
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        dishes: state.firestore.ordered.dishes,
    }

}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'dishes' }
    ]),
)(DishList);



