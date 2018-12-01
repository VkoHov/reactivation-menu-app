import React, { Component } from 'react';
import {SignUp} from '../../actions/authActions';
import { connect } from 'react-redux';
import { withRouter , Redirect} from 'react-router-dom';
import {compose} from 'redux';
import {Link} from 'react-router-dom';
import './Registration.css';


class Registration extends Component {
    state = {
        name: '',
        lastname: '',
        regemail: '',
        regpassword: '',
        passwordComfirm: '',
    };
    handleChange = (e) => {
        console.log(this.state);
        this.setState({
            [e.target.id]: e.target.value
        })
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.SignUp(this.state);
    };
    handleClick = () => {
        if (this.props.auth.uid){
            this.props.history.push('/');
        }
    };
    render() {
        if(this.props.auth.uid) return <Redirect to="/"/>;
        console.log(this.props.auth.uid);
        return(
            <section className="register paddingTop">
                <div>
                    <div className="account">                  
                        <h4>create <span>accout</span></h4>
                        <form  onSubmit={this.handleSubmit}>
                            <div >
                                <label htmlFor="name">Name</label>
                                <input type="text" id='name' onChange={this.handleChange} />
                            </div>
                            <div >
                                <label htmlFor="lastname">Lastname</label>
                                <input type="text" id='lastname' onChange={this.handleChange} />
                            </div>
                            <div >
                                <label htmlFor="email">Email</label>
                                <input type="email" id='email' onChange={this.handleChange} />
                            </div>
                            <div >
                                <label htmlFor="password">Password</label>
                                <input type="password" id='password' onChange={this.handleChange} />
                            </div>
                            <div >
                               <label htmlFor="passwordComfirm">Comfirme Password</label>
                                <input type="password" id='passwordComfirm' onChange={this.handleChange} />
                            </div>
                        
                            <div className="orLogIn">
                            Or<Link to="/login"> LOG IN</Link>
                            </div>
                            <div>
                                <button onClick={this.handleClick}>create</button>
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