import React, { Component } from 'react';
import './LoginLayout.css';
import {LoginAction} from "../../../actions/authActions";
import { connect } from 'react-redux';
import { compose } from 'redux';
import {withRouter} from 'react-router-dom';

class LoginLayout extends Component{
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
    handleClick = () => {
        if (!this.props.firebase.auth.uid){
            this.props.history.push('/');
        }
    }
    render(){
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
                        <button onClick={this.handleClick}>Login</button>
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        firebase: state.firebase,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        LoginAction: (credentials) => dispatch(LoginAction(credentials)),
    }
}
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withRouter,
)(LoginLayout);