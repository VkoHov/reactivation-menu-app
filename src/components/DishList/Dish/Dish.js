import React, { Component } from 'react';
import '../DishList.css';
class Dish extends Component {
    render() {
      
console.log('esi dishi propsna  ',this.props);

let style = {backgroundImage: 'url(' + this.props.url + ')',} 
        return (
            <div className="dishBlock" style={style}>
                <div className='shape'>
                    { this.props.dish.description }
                </div>
            </div>
        );
    }
}
export default Dish;