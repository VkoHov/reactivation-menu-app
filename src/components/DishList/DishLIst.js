import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Dish from './Dish/Dish';
import './DishList.css';


class DishList extends Component {

    state = {
        numberOfAllDish: 0,
        countOfDishPages: null,
        flag: true,
        allDish: null,
        pageNumber: 1,
        showDish: [],
    }

    shouldComponentUpdate(nextProps) {

        if (nextProps.categoryName !== this.props.categoryName) {
            this.setState({
                pageNumber: 1,
                flag: true,
            })
        }
        return nextProps.categoryName === this.props.categoryName;
    }

    splitPages = (dishis) => {
        let countOfDishPages = [];
        let countOfShowDish = 10;
        let numberOfAllDish = dishis;
        let countPages = Math.ceil(numberOfAllDish.length / countOfShowDish);
        for (let i = 1; i <= countPages; i++) {
            countOfDishPages.push(i);
        }
        return countOfDishPages;
    }



    componentDidUpdate() {

        let dishes = this.props.dishes && this.props.dishes;
        let allDish = [];
        let showDish = [];

        if (dishes && this.state.flag) {
            if (this.props.categoryName !== 'all menu') {
                for (let i = 0; i < dishes.length; i++) {
                    if (dishes[i].category === this.props.categoryName) {
                        allDish.push(dishes[i]);
                    }
                }

                for (let j = 0, i = this.state.pageNumber * 10 - 10; j < 10; j++ , i++) {
                    if (allDish[i] !== undefined) {
                        showDish[j] = allDish[i];
                    } else {
                        break;
                    }
                }

            } else {
                allDish = dishes;
                for (let i = 0; i < 10; i++) {
                    if (allDish[i] !== undefined) {
                        showDish[i] = allDish[i];
                    } else {
                        break;
                    }
                }
            }

            let pages = this.splitPages(allDish);

            this.setState({
                allDish,
                numberOfAllDish: allDish.length,
                countOfDishPages: pages,
                flag: false,
                showDish,
            })
        }
    }



    initialDish = (arg) => {
        let showDish = [];
        for (let j = 0, i = +arg.target.id * 10 - 10; j < 10; j++ , i++) {
            if (this.state.allDish[i] !== undefined) {
                showDish[j] = this.state.allDish[i];
            } else {
                break;
            }
        }
        this.setState({
            showDish,
            pageNumber: +arg.target.id,
        })
    }

    render() {
        return (
            <section className="dishList">

                <div className="container">
                    <div className="source">
                        <p>
                            <Link to="/">Home</Link>
                            <span>/</span>
                            {this.props.categoryName}
                        </p>
                    </div>
                    <div className='dishes'>
                        {
                            this.state.showDish &&
                            this.state.showDish.map((dish, index) => <Dish key={`${index}00`} dish={dish} />)
                        }
                    </div>
                </div>

                <div>
                    {
                        this.state.countOfDishPages && this.state.countOfDishPages.map((page, index) => {
                            return (
                                <div id={page} onClick={(arg) => this.initialDish(arg)} key={index}>{page} </div>
                            )
                        })
                    }
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



