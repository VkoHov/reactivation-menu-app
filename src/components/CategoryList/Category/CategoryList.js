import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import Category from './Category';
import DishList from '../DishList/DishLIst';
import Footer from '../../Homepage/Footer/Footer';
import Source from '../Source';

import '../CategoryList.css';


class CategoryList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categoryName: 'all',
            isCategory: false,
            active: false,
        }
        this.changeCategoryName = this.changeCategoryName.bind(this);
    }

    

    changeCategoryName = function (name) {
        this.setState({
            categoryName: name,
            active:true,
        });
    }



    render() {

        let categoryss = this.props.categories && Object.values( this.props.categories[0]);
             categoryss&&categoryss.shift();
        
        return (
            <div >
                <div>
                <section className="listBaner"></section>
                <section className="listMenu">
                    <ul className="container">

                        {
                            categoryss &&
                            categoryss.map((category, index) => {
                                return (
                                      
                                     <Category                                          changeCategoryName={this.changeCategoryName} 
                                        key={index} 
                                        category={category} 
                                     />
                                    
                                );
                            })
                        }
                    </ul>
                </section>
                <Source categoryName={this.state.categoryName}/>
                    
                <DishList categoryName={this.state.categoryName}  />
                    
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.firestore.ordered.categories,
        dishes: state.firestore.ordered.dishes,
    }

}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'categories' },
        { collection: 'dishes'},
    ]),
)(CategoryList);

