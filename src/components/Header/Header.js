import React, { Component } from 'react';
import {firestoreConnect} from 'react-redux-firebase';
import Navbar from "../Layout/Navbar/Navbar"
import { connect } from 'react-redux';
import { compose } from 'redux';

import './Header.css';

class Header extends Component {
    render() {
        return (
                <div>
                    <Navbar/>
                </div>
        )
    }
}
export default Header;