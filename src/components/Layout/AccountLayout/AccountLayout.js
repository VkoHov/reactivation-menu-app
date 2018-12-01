import React, { Component } from 'react';
import LogoutLayout from '../LogoutLayout/LogoutLayout';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import './AccountLayout.css';

class AccountLayout extends Component{

    render(){

        const links = this.props.authID
            ? <LogoutLayout/>
            : <div>
                <Link to='/login'>login</Link>
                <Link to='/registration'>register</Link>
            </div>
        const accountLink = this.props.authID
            ? <p><i className="far fa-user"></i></p>
            : <Link to = '/login'> <i className="far fa-user"></i> </Link>;
        return(
            <div>
                { accountLink }
                 { links }
                <div className="loginRegHover">
                    <p><Link to='/login'> log in</Link></p>
                    <p><Link to='/registration'>register</Link></p>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        authID: state.firebase.auth.uid,

    }
};
export default connect(mapStateToProps)(AccountLayout);