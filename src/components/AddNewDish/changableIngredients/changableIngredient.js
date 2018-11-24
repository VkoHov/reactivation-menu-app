import React, {Component} from 'react';
import {firestoreConnect} from 'react-redux-firebase';
import {store} from '../../../redux/reducers/newDishReducer'


import './changableIngredient.css';

class ChangableIngredient extends Component {


    state = {
        ingredients: [],
        inputsCount: ["a"],
        ingredient: '',
    }


    addNewIngredient = (ingredients) => {
        console.log('store from changeIng',store);
        this.setState({
            ingredients: this.state.ingredients.concat([this.state.ingredient]),
            inputsCount : this.state.inputsCount.concat(['a']),
        });
    }
    addIngredient(e){
        let temp = this.state.ingredients;
        let key = e.currentTarget.getAttribute('key');
        let value = e.target.value;
        console.log('gago',key);
        temp[key] = value;

        this.setState({
            ingredients: temp,
        })
        console.log(this.state.ingredients);
    }

    render() {

        return (
            <div className="changeIng">
                {this.state.inputsCount.map((inp,index)  => {
                   return (<p key={index}>
                        <input
                            id="changeIng"
                            type="text"
                            placeholder="Changeable ingredients"
                            onChange={(e) => {this.addIngredient(e)}}
                        />

                    </p>)
                })
            }

                <span onClick={this.addNewIngredient}>+</span>
            </div>
        )
    }
}


export default ChangableIngredient;