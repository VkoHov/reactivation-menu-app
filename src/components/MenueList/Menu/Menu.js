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
        let info= this.props.dish;
        let bgcolor = this.props.idd % 2 ==  0 ? " #FFF2DF": '#fff'  ;
        return (
            <div >

                <ul className="tableRow "  style={{background:`${bgcolor}`}}>
                    <li>{this.props.idd}</li>
                    <li>{info.title}</li>
                    <li>{info.description}</li>
                    <li>{info.ingredients.join(',')}</li>
                    <li>{info.price} (AMD)</li>
                    <li onClick={this.deleteDish} style={ {'width':'80px'}}>
                    <i className="far fa-trash-alt"></i>
                    </li>
                </ul>
                
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

