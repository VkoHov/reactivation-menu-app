import React, { Component } from 'react';
import LoginLayout from '../LoginLayout/LoginLayout'
import LogoutLayout from '../LogoutLayout/LogoutLayout'
import {Link} from 'react-router-dom'
import './AccountLayout.css';

class AccountLayout extends Component{
    state = {
        isLogedIn: false,
    }
    render(){
        return(
            <div>
                {this.state.isLogedIn
                    &&  <p>Account</p>
                    || <Link to = '/login'> Account </Link>
                }
                {this.state.isLogedIn
                    && <LogoutLayout/>
                    || <LoginLayout/>
                }
            </div>
        )
    }
}
export default AccountLayout;