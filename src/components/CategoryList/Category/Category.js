import React, { Component } from 'react';
import {connect} from 'react-redux';
import {changeCategoryName} from '../../../actions/listingAction'; 

import '../CategoryList.css';

class Category extends Component {

    render() {

        return (
            <div className='category-tab' onClick={()=>{
                console.log(this.props.category)
                this.props.changeCategoryName(this.props.category)
            }}>
                {
                    this.props.category
                }
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changeCategoryName: (catName) => dispatch(changeCategoryName(catName)),
    }
}


export default connect(null,mapDispatchToProps)(Category);


