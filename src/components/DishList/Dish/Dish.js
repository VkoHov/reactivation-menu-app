import React, { Component } from 'react';
import DishDetails from '../../DishDetails/DishDetails';
import {connect} from 'react-redux'


class Dish extends Component {

    constructor(props) {
        super(props);

        this.state = {
            popUpIsOpen: false,
        };

        this.showPopUp = this.showPopUp.bind(this);
    }



    showPopUp = () => {
        this.setState({
            popUpIsOpen: !this.state.popUpIsOpen,
        })
    }


    render() {

        return (
            <div>
                <div onClick={this.showPopUp} >
                    {
                        this.props.dish.title
                    }
                </div>
                {
                    this.state.popUpIsOpen && <DishDetails dish={this.props} />
                }
            </div>
        );
    }
}



export default Dish;