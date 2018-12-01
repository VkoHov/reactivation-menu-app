import React, { Component } from 'react';
import DishDetails from '../../DishDetails/DishDetails';
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

let style = {backgroundImage: 'url(' + this.props.dish.url + ')',}
     

        return (
            <div className="dishBlock" style={style} onClick={this.showPopUp}>
                <div className='shape'>
                    { this.props.dish.description }
                </div>
                <div  >
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