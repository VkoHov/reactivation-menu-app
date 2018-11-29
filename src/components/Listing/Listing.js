import React, { Component } from 'react';
import CategoryList from '../CategoryList/CategoryList';
import DishList from '../DishList/DishLIst';


class Listing extends Component {

    render() {
        return (

            <div>
                <CategoryList />
                <div> ##########</div>
                <DishList />
            </div>
        );
    }

}





export default Listing;