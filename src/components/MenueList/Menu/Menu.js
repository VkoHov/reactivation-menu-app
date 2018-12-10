import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteDish } from '../../../actions/deleteDishAction';
import { compose } from 'redux';
import {Link} from 'react-router-dom';



class Dish extends Component {


    deleteDish = () => {
        if (window.confirm("Are you sure")) {
            this.props.deleteDish({ id: this.props.dish });
        } 
    }
<<<<<<< HEAD
   
    
=======

>>>>>>> f0a0a715ee172cef8a6d0f8f8ca61bb8145b74ad
    render() {
        let info= this.props.dish;
        let bgcolor = this.props.idd % 2 ===  0 ? " #FFF2DF": '#fff'  ;
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

                    {/* <Link to="/deleteMenu"><i className="far fa-trash-alt"></i></Link> */}
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

