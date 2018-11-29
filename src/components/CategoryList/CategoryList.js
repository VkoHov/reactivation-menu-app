import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Category from './Category/Category';




class CategoryList extends Component {
    render() {


        console.log('this.propsaaa', this.props.categories && this.props.categories[0]);
        let categories = this.props.categories && Object.values(this.props.categories[0].categories);


        return (
            <div>
                {
                    categories &&
                    categories.map((category, index) => {
                        return (
                            <Category  key={index} category={category} />
                        );
                    })
                }
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

