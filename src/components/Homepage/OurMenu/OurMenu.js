import React, {Component} from 'react';
import MenuItem from './MenuItem';

import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';

import '../Homepage.css';
import './OurMenu.css';

class OurMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categoryName: 'all',
            isCategory: false,
        };
        this.changeCategoryName = this.changeCategoryName.bind(this);
    }

    changeCategoryName = function (name) {
        this.setState({
            categoryName: name,
        });
    }


    render() {
    
        let categoryss = this.props.categories && Object.values( this.props.categories[0]);
            categoryss&&categoryss.shift();

        return(
            <section >
	            <div className="container">
	            	<h1> our <span>menu</span></h1>
	            	<div className="ourMenu">
	            		{
                            categoryss && categoryss[0].map((category, index) => {
                                if(category!='all menu'){
                                    return (<MenuItem text={category} key={index}/>)
                                }
	            		})
	            		}

                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        categories: state.firestore.ordered.categories,
    }

}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'categories'},
    ]),
)(OurMenu);