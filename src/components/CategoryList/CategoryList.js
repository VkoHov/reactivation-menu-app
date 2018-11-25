import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Category from './Category/Category';
import DishList from '../DishList/DishLIst';




class CategoryList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categoryName: 'all',
            isCategory: false,
        }
        this.changeCategoryName = this.changeCategoryName.bind(this);
    }

    changeCategoryName = function (name) {
        this.setState({
            categoryName: name,
        });
    }



    render() {


        let categoryss = this.props.categories && this.props.categories[0].Category
        
        return (
            <div >
                <div>
                    {
                        categoryss &&
                        categoryss.map((category, index) => {
                            return (
                                <Category changeCategoryName={this.changeCategoryName} key={index} category={category} />
                            );
                        })
                    }
                    <div> ##########</div>
                    {
                        
                        <DishList categoryName={this.state.categoryName}  />
                    }
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.firestore.ordered.categories,
    }

}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'categories' },
    ]),
)(CategoryList);

