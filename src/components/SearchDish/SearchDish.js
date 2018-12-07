import React, { Component } from 'react';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {searchPopUpToggle} from '../../actions/searchAction';
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
    searchPopUp = e => {
        e.stopPropagation();
        this.props.searchPopUpToggle(true);
    }
    render() {
        return (
            <div className=" container" >
            <div className="searchBar" onClick={e => e.stopPropagation()}>
                <input type="text" 
                    value={this.state.inputVal}
                    onChange={this.hendleChange.bind(this)}
                    onFocus={e => this.searchPopUp(e)}

                    placeholder="Search Dish"
                />
                {this.props.isOpen && <div className='searchBox'>
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
        isOpen: state.search.isOpen,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        searchPopUpToggle: (toggle) => dispatch(searchPopUpToggle(toggle)),
    }
}
export default compose(
    firestoreConnect([
        { collection: 'dishes'}
    ]),
    connect(mapStateToProps,mapDispatchToProps)
)(SearchDish);