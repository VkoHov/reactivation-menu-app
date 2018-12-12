import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Category from './Category/Category';
import './CategoryList.css';



class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addClass: false,
        }
      }

gago=(e)=>{
    console.log(e.target,'target');
}


    render() {
        let categoryss = this.props.categories && Object.values(this.props.categories[0]);
        categoryss && categoryss.shift();

        return (
            <section className="listMenu">
                <div className="container">      
                 
      
                    <div>
                        <ul>
                        {
                            categoryss &&
                            categoryss[0].map((category, index) => {
                                return (
                                    <li  key={index} >
                                        <Category  key={index} category={category}  onClick={(e)=>{this.gago(e)}} />
                                    </li>
                                );
                            })
                     }
                        </ul>
                    </div>
                </div>
            </section>

        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.firestore.ordered.categories,
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'categories'},
    ]),
)(CategoryList);

