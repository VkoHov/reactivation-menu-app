import React, { Component } from 'react';

class Dish extends Component {
    render() {
      

        return (
            <div>
           {  this.props.dish.title}
               
            </div>
        );
    }
}
export default Dish;