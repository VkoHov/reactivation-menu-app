import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addNewDish} from '../../actions/newDishAction';
import ChangableIngredient from './changableIngredients/changableIngredient';
import {storage} from '../../config/fbConfig';
import './AddNewDish.css';

class AddNewDish extends Component {
    constructor(props) {
        super(props);
        this.addingridientArrToState = this.addingridientArrToState.bind(this);
        this.state = {
            title: null,
            description: null,
            url: '',
            ingredients: [],
            category: "category",
            price: null,
            rating: [0],
            doneness: [],
        }
    }


    addingridientArrToState(arr) {
        this.setState({
            ingredients: arr,
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    };
    handleAdd = (e) => {
        e.preventDefault();
        const {url, description, title, image, category, price, ingredients, rating, doneness} = this.state;
        if (url && description && title && image && category !== 'category' && price) {
            this.props.addNewDish({url, description, title, category, price, ingredients, rating, doneness});
            this.setState({
                title: null,
                description: null,
                url: '',
                ingredients: [],
                category: "category",
                price: null,
                rating: [0],
                doneness: [],
            })
            console.log('exav')
        } else {
            console.log('chexav brat')
        }
    };

    addImage = (e) => {
        if (e.target.files[0]) {
            let image = e.target.files[0];
            this.setState({
                image: image,
            })
        }
    };

    handleUpload = () => {
        const {image} = this.state;
        const uploadTask = storage.ref(`dishimages/${image.name}`).put(image);

        uploadTask.on('state_changed',
            (snapshot) => {
                console.log(snapshot)
            },
            (error) => {
                console.log(error)
            },
            () => {
                storage.ref('dishimages')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({url})
                    })
            }
        )
    };

    render() {
        console.log(this.state)
        return (
            <div className="add-new-dish">
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
                    <select id="category" onChange={this.handleChange} value={this.state.category}>
                        <option value="category" disabled style={{display: 'none'}}> Category</option>
                        <option value="desert"> Desert</option>
                        <option value="salad"> Salad</option>
                        <option value="garnish"> Garnish</option>
                    </select>
                    <ChangableIngredient changedIngArr={this.addingridientArrToState}/>
                    <input id="price"
                           type="text"
                           placeholder="Price"
                           onChange={this.handleChange}
                    />
                    <button type="button" onClick={this.handleAdd}> Add</button>
                </form>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addNewDish: (newDish) => dispatch(addNewDish(newDish))
    }
}

export default connect(null, mapDispatchToProps)(AddNewDish);