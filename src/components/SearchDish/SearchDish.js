import React, { Component } from 'react';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {connect} from 'react-redux';
import './SearchDish.css';

class SearchDish extends Component {

    state={
        inputVal: '',
        isOpen: false,
    };

    hendleChange(e){
        this.setState({
            inputVal: e.target.value,
        })
    }
    triggerSearchTab(){
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }
    render() {
        console.log(this.props.dishes);
        console.log(this.state.inputVal)
        return (
            <div className=" container">
            <div className="searchBar">
                <input type="text" 
                    value={this.state.inputVal} 
                    onFocus={this.triggerSearchTab.bind(this)} 
                    onChange={this.hendleChange.bind(this)}
                    placeholder="Search Dish"
                />
                {this.state.isOpen && <div className='searchBox'>
                    {this.props.dishes && this.props.dishes.map((dish, index) => {
                        return dish.title.toLowerCase().includes(this.state.inputVal.toLowerCase()) &&this.state.inputVal && <p key={index}>{dish.title}</p>;
                    })}
                </div>}
            </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        dishes: state.firestore.ordered.dishes,
    }
}

export default compose(
    firestoreConnect([
        { collection: 'dishes'}
    ]),
    connect(mapStateToProps)
)(SearchDish);