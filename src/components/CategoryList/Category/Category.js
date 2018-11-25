import React, { Component } from 'react';


class Category extends Component {
   constructor(props) {
        super(props);

        this.state = {
            addClass: false,
        }
        this.addActive = this.addActive.bind(this);
    }

    addActive = () => {
    	   this.setState({
            addClass: !this.state.addClass
        });
    }

    render() {
        let activeClass = '';
        if(this.state.addClass) {
          activeClass = 'active';
        }
        return (
            <li className={activeClass} onClick={()=>
            	{ this.props.changeCategoryName(this.props.category)},
            	this.addActive }  >
                {
                    this.props.category
                }
            </li>
        );
    }
}


export default Category;


