import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Category from './Category/Category';




class CategoryList extends Component {

    render() {

        let categoryss = this.props.categories && Object.values(this.props.categories[0]);
        categoryss && categoryss.shift();

        return (
            <div>
                {
                    categoryss &&
                    categoryss.map((category, index) => {
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

