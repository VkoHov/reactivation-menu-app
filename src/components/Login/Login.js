import React, { Component } from 'react';
import {LoginAction} from '../../actions/authActions';
import { connect } from 'react-redux';
import { withRouter , Redirect} from 'react-router-dom';
import {compose} from 'redux';

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
    handleClick = () => {
        if (!this.props.firebase.auth.uid){
            this.props.history.push('/');
        }
    }
    render() {
        if(this.props.auth.uid) return <Redirect to="/"/>
        return(
            <div>
                <form  onSubmit={this.handleSubmit}>
                    <div >
                        <label htmlFor="emailP">Email</label>
                        <input type="email" id='emailP' onChange={this.handleChange} />
                    </div>
                    <div >
                        <label htmlFor="passwordP">Password</label>
                        <input type="password" id='passwordP' onChange={this.handleChange} />
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
        auth: state.firebase.auth,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        LoginAction: (credentials) => dispatch(LoginAction(credentials)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(Login);