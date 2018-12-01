import React, { Component } from 'react';
import ListingBaner from './ListingBaner';
import CategoryList from '../CategoryList/CategoryList';
import DishList from '../DishList/DishLIst';


class Listing extends Component {

    render() {
        return (

            <div>
                <ListingBaner/>
                <CategoryList />
                <DishList />
            </div>
        );
    }

}





export default Listing;