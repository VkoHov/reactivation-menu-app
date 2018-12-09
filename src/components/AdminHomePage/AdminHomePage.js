import React, { Component } from 'react';
import { Link } from "react-router-dom";
import TableLIst from './Tablelist/TableList';
import "./AdminHomePage.css";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
class AdminHomePage extends Component {

    render() {
        if (!this.props.auth.uid) return <Redirect to="/login"/>;
        return (
            <section className="adminPage paddingTop">
                <div className="container">
                    <div className="edit">
                        <Link to='/admin/editadmin'><p>Edit Admin </p> </Link>
                        <Link to='/admin/editmanu'> <p>Edit Menu </p> </Link>
                    </div>
                    <TableLIst />
                </div>
            </section>
        );
    }

}
const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
    }
}
export default connect(mapStateToProps)(AdminHomePage);