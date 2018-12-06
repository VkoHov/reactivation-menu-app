import React, { Component } from 'react';
import { SignUp } from '../../actions/authActions';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import './Registration.css';

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
        console.log(this.state);
        this.setState({
            [e.target.id]: e.target.value
        })
    };
    handleSubmit = (e) => {
        e.preventDefault();

    };
    handleClick = () => {

        if (this.state.password === this.state.passwordComfirm && this.state.password.length >= 6) {
            if (this.props.auth.uid) {
                this.props.history.push('/');
            }
            this.setState({
                passwordComfErr: false,
            });
            let { name, lastname, email, password } = this.state;
            if (lastname.length !== 0 && name.length !== 0) {
                this.setState({
                    invalidInpErr: false,
                });
                this.props.SignUp({
                    name: name,
                    lastname: lastname,
                    email: email,
                    password: password,
                    collection: 'users',
                });
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

        if (this.props.auth.uid) return <Redirect to="/" />;
        return (
            <section className="register paddingTop">
                <div >
                    <div className="account">
                        <h4>create <span>accout</span></h4>
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
                            <div className="orLogIn">
                                Or<Link to="/login"> LOG IN</Link>
                            </div> 
                            <div className="">
                                <button onClick={this.handleClick}>register</button>
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
                        auth: state.firebase.auth,
                    registerError: state.login.authError
                }
            }
const mapDispatchToProps = dispatch => {
    return {
                        SignUp: (newUser) => dispatch(SignUp(newUser)),
                }
            }
            
            export default compose(
                connect(mapStateToProps, mapDispatchToProps),
                withRouter,
)(Registration);