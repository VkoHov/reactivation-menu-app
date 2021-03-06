import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewDish } from '../../actions/newDishAction';
import ChangableIngredient from './changableIngredients/changableIngredient';
import Doneness from './Doneness/Doneness';
import { storage } from '../../config/fbConfig';
import { firestoreConnect } from "react-redux-firebase";
import {Link, withRouter} from 'react-router-dom';
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
            nameError:'',
            descError:'',
            categError:'',
            priceError:'',
            fileError:'',
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
        console.log("its work", e.target.value)
        this.setState({
            [e.target.id]: e.target.value,
        })
        console.log(this.state.category,'state');
    };
    handleAdd = (e) => {
        console.log(this.state.category === 'category',this.state.categError)
        switch (true) {
            case (this.state.title === null):
            this.setState({
                nameError: 'errorBorder'
            })
            break;
            case (this.state.description === null):
            this.setState({
                descError: 'errorBorder'
            })
            break;
            case (this.state.category === 'category'):
            
                this.setState({
                    categError: 'errorBorder'
                })
            
            break;
            case (this.state.price === null):
            this.setState({
               priceError: 'errorBorder'
            })
            break;
            case (this.state.url === ''):
            this.setState({
              fileError: 'errorBorder'
            })
            break;
            
    
			
            }
        e.preventDefault();
        const { url, description, title, image, category, price, ingredients, rating, doneness } = this.state;
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

            });
            this.props.history.push('/admin/editmanu');
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
                        this.setState({ url });
                        alert('image uploaded');
                    })
            }
        )
    };

    render() {
        return (
            <section className="new-dish">
                <div className="paddingTop">
                    <div className="add-new-dish">
                        <h3>Create a new dish</h3>
                        <form>
                            <div>
                                <label htmlFor="title">dish title</label>
                                <input
                                    id="title"
                                    type="text"
                                    className="and"
                                    placeholder="Dish title"
                                    className = {this.state.nameError +' and'}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="description">Short description</label>
                                <textarea
                                    id="description"
                                    className={this.state.descError +' and'}
                                    placeholder="Short description"
                                    onChange={this.handleChange}>
                                </textarea>

                            </div>
                            <div>
                                <label htmlFor="Category">Category</label>
                                <select
                                    id="category" onChange={this.handleChange}
                                    className={this.state.categError + " and"}
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
                            </div>

                            <div>
                                <label htmlFor="cahngeIng">changeble ingredient</label>
                                <ChangableIngredient changedIngArr={this.addingridientArrToState} id="cahngeIng"
                                />
                            </div>

                            <div>
                                <label htmlFor="doneness">doneness</label>
                                <Doneness changedDonnesArr={this.addDonenessArrToState} id="doneness"
                                />
                            </div>
                            <div>
                                <label htmlFor="price">price</label>
                                <input id="price"
                                    type="text"
                                    className={this.state.priceError +" and"}
                                    placeholder="Price"
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="image">upload <span>a</span> Photo</label>
                                <input
                                    id="image"
                                    type="file"
                                    className={this.state.fileError +" and"}
                                    onChange={this.addImage}
                                />
                                <button type="button" className="upload" onClick={this.handleUpload}>Upload</button>
                            </div>
                            <div>
                                <Link to='/admin' className="add">
                                    back to admin page
                        </Link>
                                <button type="button" className="add" onClick={this.handleAdd}> Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        categories: state.firestore.ordered.categories
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addNewDish: (newDish) => dispatch(addNewDish(newDish)),
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    firestoreConnect([
        { collection: 'categories' }
    ])
)(AddNewDish);