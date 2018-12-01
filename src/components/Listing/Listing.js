import React, { Component } from 'react';
import ListingBaner from './ListingBaner';
import CategoryList from '../CategoryList/CategoryList';
import DishList from '../DishList/DishLIst';
import SearchDish from "../SearchDish/SearchDish";


class Listing extends Component {

    render() {
        return (

            <div>
                <ListingBaner/>
                <SearchDish/>
                <CategoryList />
                <DishList />
            </div>
        );
    }

}





export default Listing;