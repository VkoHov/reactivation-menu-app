import React, { Component } from 'react';
import {loginUser} from '../../actions/loginAction'
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
        this.props.loginUser(this.state);
    }
    render() {
        return(
            <div>
                <form  onSubmit={this.handleSubmit}>
                    <h5 >Sign In</h5>
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
        loginUser: (user) => dispatch(loginUser(user)),
    }
}

export default connect(null, mapDispatchToProps)(Login);