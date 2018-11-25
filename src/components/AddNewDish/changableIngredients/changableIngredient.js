import React, {Component} from 'react';
import './changableIngredient.css';
class ChangableIngredient extends Component {


    state = {
        ingredients: [''],
    };

    addNewIngredient = () => {
        this.setState({
            ingredients: this.state.ingredients.concat(['']),
        });
    };
    addIngredient(e){
        let temp = this.state.ingredients;
        let key = e.target.getAttribute('inpid');
        let value = e.target.value;
        temp[key] = value;
        this.setState({
            ingredients: temp,
        });
        this.props.changedIngArr(temp);
    }
    render() {

        return (
            <div className="changeIng">
                {this.state.ingredients.map((inp,index)  => {
                       return (<p key={index}>
                            <input
                                inpid = {index}
                                id = {"changeIng " + index}
                                type = "text"
                                placeholder = "Changeable ingredients"
                                onChange = {(e) => {this.addIngredient(e)}}
                            />

                        </p>)
                })}

                <span onClick={this.addNewIngredient}>+</span>
            </div>
        )
    }
}


export default ChangableIngredient;