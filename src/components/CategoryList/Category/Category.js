import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeCategoryName } from '../../../actions/listingAction';

import '../CategoryList.css';

class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allmenu: null,
            sallads: null,
            grill: null,
            wurst: null,
            burger: null,
            drinks: null,
            steaks: null,
        }
    }
    addClass = (e) => {
        this.setState({
            [e.target.id]:'active',
          })
    }
    render() {
        return (
            <li id={this.props.category} onClick={(e) => {
                this.props.changeCategoryName(this.props.category);
              this.addClass(e)
              
            }}>
                {
                    this.props.category
                }
            </li>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changeCategoryName: (catName) => dispatch(changeCategoryName(catName)),
    }
}


export default connect(null, mapDispatchToProps)(Category);


