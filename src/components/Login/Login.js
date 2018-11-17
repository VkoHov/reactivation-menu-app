import React, { Component } from 'react';
import {LoginAction} from '../../actions/authActions'
import { connect } from 'react-redux'
import './Login.css';


class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.LoginAction(this.state);
    }
    render() {
        return(
            <div>
                <form  onSubmit={this.handleSubmit}>
                    <div >
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' onChange={this.handleChange} />
                    </div>
                    <div >
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' onChange={this.handleChange} />
                    </div>
                    <div>
                        <button >Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        LoginAction: (credentials) => dispatch(LoginAction(credentials)),
    }
}

export default connect(null, mapDispatchToProps)(Login);