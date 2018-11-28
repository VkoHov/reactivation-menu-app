import React, { Component } from 'react';
import CategoryList from '../CategoryList/CategoryList';
import DishList from '../DishList/DishLIst';


class Listing extends Component {

    render() {
        console.log('esi listinginna',this.props);
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