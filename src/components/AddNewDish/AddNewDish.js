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
		category:"Category",
		price:null,
		str:"",
	}

	handleChange = (e) =>{
		this.setState({
			[e.target.id]: e.target.value,
		})
	}

	handleAdd = (e) => {
		e.preventDefault();
		console.log(this.state);
		this.props.addNewDish(this.state)
	}

	addImage = (e) => {
		if(e.target.files[0]){
			this.setState({
				image:e.target.files[0]
			})

		}

	}
	handleUpload = () => {
		const {image} = this.state;
		const uploadImg = storage.ref(`images/${image.name}`).put(image);
		
		console.log(image)
		uploadImg.on('state_changed',
				(snapshot) => {},
				(error) => {},
				() => {
					storage.ref('images')
						.child(image.name)
						.getDownloadURL()
						.then(url => {console.log(url)})
				}
			)
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
                		<p><input 
	                		id="image" 
	                		type="file" 
	                		onChange={this.addImage}
                		/>
                		<button type="button" onClick={this.handleUpload}>Upload</button>
                		</p>
                		<select id="category" onChange={this.handleChange}  value={this.state.category}>
                			<option disabled="disabled" >
                				Categorys
                			</option>
                			<option>desert</option>
                			<option>salad</option>
                			<option>garnish</option>
                		</select>
                		<ChangableIngredient/>
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