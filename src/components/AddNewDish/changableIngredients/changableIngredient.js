import React, {Component} from 'react';
import {firestoreConnect} from 'react-redux-firebase';


import './changableIngredient.css';

class ChangableIngredient extends Component {
    state = {
        ingredients: [],
        inputsCount: ["a"],
        ingredient: '',
    }

    addIngredient = (e) => {
        this.setState({
            ingredient: e.target.value
        });
    }

    addNewIngredient = () => {
        this.setState({
            ingredients: this.state.ingredients.concat([this.state.ingredient]),
            inputsCount : this.state.inputsCount.concat(['a']),
        });
    }


    render() {
        console.log(this.state.inputsCount);
        return (
            <div className="changeIng">
                {this.state.inputsCount.map((inp,index)  => {
                   return (<p key={index}>
                        <input
                            id="changeIng"
                            type="text"
                            placeholder="Changeable ingredients"
                            onChange={this.addIngredient}
                        />
                        <span onClick={this.addNewIngredient}>+</span>

                    </p>)
                })
            }

            </div>
        )
    }
}


export default ChangableIngredient;