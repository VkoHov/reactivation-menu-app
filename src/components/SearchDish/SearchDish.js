import React, { Component } from 'react';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {connect} from 'react-redux';

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
        return (
            <div>
                <input type="text" value={this.state.inputVal} onFocus={this.triggerSearchTab.bind(this)} onChange={this.hendleChange.bind(this)}/>
                {this.state.isOpen && <div>
                    {this.props.dishes && this.props.dishes.map((dish, index) => {
                        return dish.title.toLowerCase().includes(this.state.inputVal.toLowerCase()) &&this.state.inputVal && <p key={index}>{dish.title}</p>;
                    })}
                </div>}
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