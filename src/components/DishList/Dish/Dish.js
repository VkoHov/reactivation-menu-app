import React, { Component } from 'react';

class Dish extends Component {
    render() {
      
console.log('esi dishi propsna jhvgk ftfuctc ',this.props);
        return (
            <div>
           {  this.props.dish.description}
               
            </div>
        );
    }
}
export default Dish;