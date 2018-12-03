import React, { Component } from 'react';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from 'react-router-dom';
import { compose } from "redux";
class Favorites extends Component {
    state = {  }
    render() { 
        console.log(this.props.auth.uid)
         return !this.props.auth.uid && <Redirect to="/login"/> || <div>{'dfdgdfgfdg'}</div>
        
    }
}
const mapStateToProps = state => {
    return{
        auth: state.firebase.auth,
    }
}
 
export default compose(
  connect(
    mapStateToProps
  ),
  firestoreConnect([{ collection: "dishes" }])
)(Favorites);