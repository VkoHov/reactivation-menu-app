import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './FavoriteLayout.css';

class FavoriteLayout extends Component{

    render(){
        return(
            <div className="favoriteLayout">
                <Link to=""><i className="far fa-heart"></i></Link>
                <div >
                    <p>Favorits</p>

                </div>
            </div>
        )
    }
}


export default FavoriteLayout;