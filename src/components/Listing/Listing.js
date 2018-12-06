import React, { Component } from 'react';
import ListingBaner from './ListingBaner';
import CategoryList from '../CategoryList/CategoryList';
import DishList from '../DishList/DishLIst';
import SearchDish from "../SearchDish/SearchDish";
import {searchPopUpToggle} from '../../actions/searchAction';
import {connect} from 'react-redux';


class Listing extends Component {

    


    render() {
        return (

            <div onClick={() => this.props.searchPopUpToggle(false)}>
                <ListingBaner/>
                <SearchDish/>
                <CategoryList />
                <DishList />
                
            </div>
        );
    }

}



const mapDispatchToProps = dispatch => {
    return {
        searchPopUpToggle: (toggle) => dispatch(searchPopUpToggle(toggle)),
    }
}

export default connect(null,mapDispatchToProps)(Listing);