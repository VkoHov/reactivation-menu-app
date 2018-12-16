import React, {Component} from 'react';
import {Link} from "react-router-dom";
import TableLIst from './Tablelist/TableList';
import "./AdminHomePage.css";
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class AdminHomePage extends Component {

    render() {
        const {admins, auth} = this.props;
        console.log(admins && admins)
        const isAdmin = admins && admins.filter(admin => {
            return admin.id === auth.uid && admin;
        });
        console.log(isAdmin && isAdmin.length === 0);
        return (!auth.uid && <Redirect to="/login"/>)
            || (isAdmin && isAdmin.length === 0 && <Redirect to="/"/>)
            || (
                <section className="adminPage paddingTop">
                    <div className="container">
                        <div className="edit">
                            <Link to='/admin/editadmin'><p>Edit Admin </p></Link>
                            <Link to='/admin/editmanu'><p>Edit Menu </p></Link>
                        </div>
                        <TableLIst/>
                    </div>
                </section>
            );
    }

}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        admins: state.firestore.ordered.administrators,
    }
};
export default compose(
    connect(mapStateToProps),
    firestoreConnect([{collection: 'administrators'}]),
)(AdminHomePage);