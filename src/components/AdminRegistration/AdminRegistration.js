import React, { Component } from 'react';
import { SignUp } from '../../actions/authActions';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from "react-redux-firebase";
import { AdminRegistration } from '../../actions/AdminRegistrationAction'
import './AdminRegistration.css';


class Registration extends Component {
    state = {
        name: '',
        lastname: '',
        email: '',
        password: '',
        passwordComfirm: '',
        passwordComfErr: false,
        invalidInpErr: false,
    };
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };
    handleSubmit = (e) => {
        e.preventDefault();
    };


    handleClick = () => {
        let { name, lastname, email, password, passwordComfirm } = this.state;
        if (password === passwordComfirm && password.length >= 6) {
            this.setState({
                passwordComfErr: false,
            });
            let admin = this.props.admins.administrators && this.props.admins.administrators.filter(admin => {
                return admin.email === email && email
            });
            if (lastname.length !== 0 && name.length !== 0 && admin.length === 0) {
                this.setState({
                    invalidInpErr: false,
                });
                let signup = this.props.SignUp({
                    name: name,
                    lastname: lastname,
                    email: email,
                    password: password,
                    collection: 'administrators',
                });

                 this.props.AdminRegistration({
                    name: name,
                    lastname: lastname,
                    email: email,
                    password: password,
                });
                signup.then(() => this.props.history.push('/admin'));
            } else {
                this.setState({
                    invalidInpErr: true,
                });
            }
        } else {
            this.setState({
                passwordComfErr: true,
            })
        }



    };

    render() {
        console.log(this.props.admins, this.state, 'garniki 380');
        if (!this.props.auth.uid) return <Redirect to="/login" />;
        return (
            <div className='paddingTop'>

                <form onSubmit={this.handleSubmit}>
                    {this.state.invalidInpErr && <div> Invalid input </div>}
                    {this.props.registerError && <div>{this.props.registerError}</div>}
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name' onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="lastname">Lastname</label>
                        <input type="text" id='lastname' onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' onChange={this.handleChange} />
                    </div>
                    {this.state.passwordComfErr && <div>Invalid password input</div>}
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="passwordComfirm">Comfirme Password</label>
                        <input type="password" id='passwordComfirm' onChange={this.handleChange} />
                    </div>
                    <div>
                        <button onClick={this.handleClick}>Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        registerError: state.login.authError,
        admins: state.firestore.ordered,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        SignUp: (newUser) => dispatch(SignUp(newUser)),
        AdminRegistration: (newAdmin) => dispatch(AdminRegistration(newAdmin)),
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: 'administrators' }]),
    withRouter,
)(Registration);