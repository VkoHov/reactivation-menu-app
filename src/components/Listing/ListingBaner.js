import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import './Listing.css';



class ListingBaner extends Component {

    render() {

        return (
            <section className="listingBaner">
               
            </section>
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
)(ListingBaner);

