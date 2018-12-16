import React, { Component } from 'react';
import {LoginAction} from '../../actions/authActions';
import { connect } from 'react-redux';
import { withRouter , Redirect} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {compose} from 'redux';
import './Login.css';



class Login extends Component {
    state = {
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
    };
    handleChange = (e) => {
        this.setState({
            [e.target.type]: e.target.value
        })
    };
    handleSubmit = (e) => {
        e.preventDefault();

    };
    handleClick = () => {
        this.props.LoginAction(this.state);
        if (this.props.firebase.auth.uid){
            this.props.history.push('/');
        }
        switch(true) {
            case (this.state.emailError === '') :
            this.setState({
                emailError :'errorBorder',
            });
            break;
            case (this.state.passwordError === '') :
            this.setState({
                passwordError :'errorBorder',
            });
            break;
        }
    };
    render() {

        if(this.props.auth.uid) return <Redirect to="/"/>
        return(
            <section className="loginPage paddingTop">
                <div>
                    <div className="loginForm">
                    <h4>welcome <span>back</span></h4>
                        <form  onSubmit={this.handleSubmit}>
                            <div >
                                <label htmlFor="pemail">Email</label>
                                <input type="email" id='pemail' onChange={this.handleChange} className = {this.state.emailError}/>
                            </div>
                            <div >
                                <label htmlFor="ppassword">Password</label>
                                <input type="password" id='ppassword' onChange={this.handleChange}  className = {this.state.passwordError}/>
                            </div>
                        
                            <div className="orLogIn">
                                Or <Link to="/registration"> CREATE ACCOUNT</Link>
                            </div>
                            <div>
                                <button type="button" onClick={this.handleClick}>Login</button>
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