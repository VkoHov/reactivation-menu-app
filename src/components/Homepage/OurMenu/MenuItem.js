import React, { Component } from 'react';
import '../Homepage.css';
import './OurMenu.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {changeCategoryName} from "../../../actions/listingAction";
class MenuItem extends Component {
	changeCatName(){

        this.props.changeCategoryName(this.props.text)
	}
    render() {

        return(

				<div onClick={() => this.changeCatName()} className="catImg">
                    <Link to="/listing">
					<div className="shape">
						<p><i className="fas fa-utensils"></i></p>
						<p></p>
						<p>{this.props.text}</p>
					</div>
                    </Link>
				</div>

						
        )
    }
}
const mapDispatchToProps = dispatch => {
	return{
        changeCategoryName: (catName) => dispatch(changeCategoryName(catName)),
	}
}


export default connect(null,mapDispatchToProps)(MenuItem);