import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from 'react-router-dom';
import Dish from './Menu/Menu';
import './MenuList.css';

class MenuList extends Component {

    render() {

        return (
            <section className="menuList paddingTop">
                <div className="container">
                    <h1>menu</h1>
                    <div className="menuTable" >
                        <ul className="tableRow tableHead">
                            <li>N/N</li>
                            <li>dish title</li>
                            <li>short description</li>
                            <li>changable ingredients</li>
                            <li>price</li>
                            <li>delete</li>
                        </ul>
                        {
                            this.props.categories &&
                            this.props.categories[0].categories.map((category, index) => {
                                let id = 1;

                                return category !== 'all menu' && (
                                    <div key={index} >

                                        <h2 > {category}</h2>
                                        {
                                            this.props.dishes && this.props.dishes.map(dish => {

                                                return dish.category === category && <Dish idd={id++} key={dish.id} dish={dish} />;
                                            })
                                        }

                                    </div>
                                );
                            })
                        }
                    </div>
                    <p className="addNewD">
                        <Link to='/admin' >
                            <button>back to admin page</button>
                        </Link>
                        <Link to='/newDish' >
                            <button>Add Dish</button>
                        </Link>
                    </p>
                </div>
            </section>
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
