import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { addNewDish } from '../../actions/newDishAction';
import ChangableIngredient from './changableIngredients/changableIngredient';
import {storage} from '../../config/fbConfig';
import './AddNewDish.css';

class AddNewDish extends Component {

	state = {
		title:null,
		description:null,
		image:null,
		url:null,
		changeIng:'',
		category:"category",
		price:null,
		str:"",
	}

	addingridientArrToState(arr){
		this.setState({
			changeIng: arr,
		})
	}

	handleChange = (e) =>{
		this.setState({
			[e.target.id]: e.target.value,
		})
	}

	hhh = (ingredients) => {
		this.setState({
			changeIng:ingredients,
		})
	}

	handleAdd = (e) => {
		e.preventDefault();
		this.props.addNewDish(this.state)
	}

	addImage = (e) => {
		if(e.target.files[0]) {
			let image = e.target.files[0];
			this.setState({
				image:image,
			})
		}


  
	}

	handleUpload = () => {
		const {image} = this.state;
		const uploadTask = storage.ref(`images/${image.name}`).put(image);
		
		console.log('state.image',image)
		uploadTask.on('state_changed',
				(snapshot) => {console.log(snapshot)},
				(error) => {console.log(error)},
				() => {
					storage.ref('images')
						.child(image.name)
						.getDownloadURL()
						.then(url => {console.log(url)})
				}
			)
		

	}

addIngredient = (e) => {
        this.setState({
            ingredient: e.target.value
        });
    }
    render() {
        return (
                <div className="addNewDish">
                	<form>
                		<input 
	                		id="title" 
	                		type="text" 
	                		placeholder="Dish title" 
	                		onChange={this.handleChange}
                		/>
                		<textarea 
	                		id="description" 
	                		placeholder="Short description" 
	                		onChange={this.handleChange}>
                		</textarea>
                		<p>
	                		<input 
		                		id="image" 
		                		type="file" 
		                		onChange={this.addImage}
	                		/>
			           		<button type="button" onClick={this.handleUpload}>Upload</button>
		                </p>
                		<select id="category" onChange={this.handleChange}  value={this.state.category}>
							<option value="category" disabled style={{display: 'none'}}> Category </option>
                			<option value="desert"> Desert </option>
                			<option value="salad"> Salad </option>
                			<option value="garnish"> Garnish </option>
                		</select>
	                	<ChangableIngredient changeIng={this.addingridientArrToState}/>
	                	<input id="price" 
	                		type="text" 
	                		placeholder="Price" 
	                		onChange={this.handleChange}
                		/>
                		<button type="button" onClick={this.handleAdd}> Add </button>
                	</form>
                </div>
        )
    }
}



const mapDispatchToProps = (dispatch) => {
	return{
		addNewDish:(newDish) => dispatch(addNewDish(newDish))
	}
}

export default connect(null, mapDispatchToProps)(AddNewDish);