import React, { Component } from 'react';
import DishDetails from '../../DishDetails/DishDetails';

class Dish extends Component {

    constructor(props) {
        super(props);

        this.state = {
            popUpIsOpen: false,
            starUrl:"https://firebasestorage.googleapis.com/v0/b/menu-app-d88b1.appspot.com/o/star.png?alt=media&token=361e13d4-7882-4400-90f1-b72278a8a382",
        };

        this.showPopUp = this.showPopUp.bind(this);
    }

    showPopUp = () => {
        this.setState({
            popUpIsOpen: !this.state.popUpIsOpen,
        })
    }


    render() {


        let style = {backgroundImage: 'url(' + this.props.dish.url + ')',} 
        
        return (
            <div className="dishBl">
            <div className="dishBlock" style={style} onClick={this.showPopUp} >
                {/* <div className='shape'>
                </div> */}
            </div>
                <div >
                    <h5>
                        { this.props.dish.title }
                        <p><i className="far fa-heart"></i></p>
                    </h5>

                      <div className="star-container">
                        <img className="star" alt="star" src={this.state.starUrl}/>
                        <img className="star" alt="star" src={this.state.starUrl}/>
                        <img className="star" alt="star" src={this.state.starUrl}/>
                        <img className="star" alt="star" src={this.state.starUrl}/>
                        <img className="star" alt="star" src={this.state.starUrl}/>
                    </div>
                   <p className="dishDesc">{ this.props.dish.description }</p> 
                </div>
                {this.state.popUpIsOpen && <div onClick={(e)=> {e.stopPropagation()}}><DishDetails dish={this.props} /></div> }
                {this.state.popUpIsOpen &&   <div className = "overlay"></div>}
                
                
               
            </div>
        );
    }
}



export default Dish;