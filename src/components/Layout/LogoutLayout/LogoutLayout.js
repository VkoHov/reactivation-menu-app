import React, { Component } from 'react';
import './LogoutLayout.css';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import {LogoutAction} from "../../../actions/authActions";

class LogoutLayout extends Component{
        render(){
            console.log(this.props.firestoreInfo);
            let users = this.props.firestoreInfo.users ? Object.values(this.props.firestoreInfo.users) : [];
            let user = users.filter((user) => {
                return user.userId === this.props.firebaseInfo.auth.uid
            });
            return(
                <div>
                    <p>Deer { user[0] && user[0].name + ' ' + user[0].surname} welcome to our Restaurant </p>
                    <p>{this.props.firebaseInfo.auth.email}</p>
                    <button onClick={() => {this.props.LogoutAction()}}> logout</button>
                </div>
            )
        }
}
const mapStateToProps = state => {
    return {
        firebaseInfo: state.firebase,
        firestoreInfo: state.firestore.data,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        LogoutAction: () => dispatch(LogoutAction()),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' }
    ]),
)(LogoutLayout);