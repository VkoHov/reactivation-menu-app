import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteDish } from '../../../actions/deleteDishAction';
import { compose } from 'redux';



class Dish extends Component {

    deleteDish = () => {
        this.props.deleteDish({ id: this.props.dish });
    }

    render() {
        console.log('lejhflkwlkwjvnn ewouhefiwuoh jnwjg', this.props);
        return (
            <div >
                {
                    this.props.dish.title
                }
                <div onClick={this.deleteDish}>
                    Delete Dish
                 </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dishes: state.firestore.ordered.dishes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteDish: dish => dispatch(deleteDish(dish.id)),
    };
};


export default compose(connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'dishes' }
    ])
)(Dish);

