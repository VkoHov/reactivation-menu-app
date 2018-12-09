import React, { Component } from 'react';

import {Link} from 'react-router-dom';



class DeleteMenu extends Component {
    deleteDish = () => {
        this.props.deleteDish({ id: this.props.dish });
    }
   
    
    render() {
       
        console.log(this.props)
        return (
            <div className="paddingTop">

                    <p style={ {'width':'80px'}}>
                        <button type="button" onClick={this.deleteDish}>delete</button>
                        <button>cancel</button>
                    </p>

                
                
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        dishes: state.firestore.ordered.dishes,
    }
}



export default DeleteMenu;
