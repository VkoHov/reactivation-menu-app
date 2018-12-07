import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewDish } from '../../actions/newDishAction';
import ChangableIngredient from './changableIngredients/changableIngredient';
import Doneness from './Doneness/Doneness';
import { storage } from '../../config/fbConfig';
import { firestoreConnect } from "react-redux-firebase";
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import './AddNewDish.css';

class AddNewDish extends Component {
    constructor(props) {
        super(props);
        this.addingridientArrToState = this.addingridientArrToState.bind(this);
        this.addDonenessArrToState = this.addDonenessArrToState.bind(this);
        this.state = {
            title: null,
            description: null,
            url: '',
            ingredients: [],
            category: "category",
            price: null,
            rating: [],
            doneness: [],
        }
    }


    addingridientArrToState(arr) {
        this.setState({
            ingredients: arr,
        });
    }
    addDonenessArrToState(arr) {
        this.setState({
            doneness: arr,
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    };
    handleAdd = (e) => {
        e.preventDefault();
        const { url, description, title, image, category, price, ingredients, rating, doneness } = this.state;
        console.log(doneness)
        if (url && description && title && image && category !== 'category' && price) {
            this.props.addNewDish({ url, description, title, category, price, ingredients, rating, doneness });
            this.setState({
                title: null,
                description: null,
                url: '',
                ingredients: [],
                category: "category",
                price: null,
                rating: [],
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
        const { image } = this.state;
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
                        this.setState({ url })
                    })
            }
        )
    };

    render() {
        return (
            <section className="new-dish">
                <div className="add-new-dish">
                    <h3>Create a new users and add them to the site</h3>
                    <form>
                        <p>
                            <label htmlFor="title">dish title</label>
                            <input
                                id="title"
                                type="text"
                                className="and"
                                placeholder="Dish title"
                                onChange={this.handleChange}
                            />
                        </p>
                        <p>
                            <label htmlFor="description">Short description</label>
                            <textarea
                                id="description"
                                className="and"
                                placeholder="Short description"
                                onChange={this.handleChange}>
                            </textarea>

                        </p>
                        <p>
                            <label htmlFor="Category">Category</label>
                            <select
                                id="category" onChange={this.handleChange}
                                className="and"
                                value={this.state.category}
                            >
                                <option value="category" disabled style={{ display: 'none' }}> Category</option>
                                {
                                    this.props.categories
                                    && this.props.categories[0].categories.map((category, index) => {
                                        return category !== 'all menu' && <option key={index} value={category}> {category}</option>
                                    })
                                }
                            </select>
                        </p>

                        <p>
                            <label htmlFor="cahngeIng">changeble ingredient</label>
                            <ChangableIngredient changedIngArr={this.addingridientArrToState} id="cahngeIng"
                            />
                        </p>

                        <p>
                            <label htmlFor="doneness">doneness</label>
                            <Doneness changedDonnesArr={this.addDonenessArrToState} id="doneness"
                            />
                        </p>
                        <p>
                            <label htmlFor="price">price</label>
                            <input id="price"
                                type="text"
                                className="and"
                                placeholder="Price"
                                onChange={this.handleChange}
                            />
                        </p>

                        <p>
                            <label htmlFor="image">upload <span>a</span> Photo</label>
                            <input
                                id="image"
                                type="file"
                                className="and"
                                onChange={this.addImage}
                            />
                            <button type="button" className="upload" onClick={this.handleUpload}>Upload</button>
                        </p>
                        <p>
                            <Link to='/admin' className="add">
                                back to admin page
                        </Link>
                            <button type="button" className="add" onClick={this.handleAdd}> Add</button>
                        </p>
                    </form>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        categories: state.firestore.ordered.categories
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addNewDish: (newDish) => dispatch(addNewDish(newDish)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'categories' }
    ])
)(AddNewDish);