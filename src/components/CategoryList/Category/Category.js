import React, { Component } from 'react';


class Category extends Component {

    render() {
        return (
            <div onClick={()=>{ this.props.changeCategoryName(this.props.category)} }  >
                {
                    this.props.category
                }
            </div>
        );
    }
}


export default Category;


