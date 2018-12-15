import React, { Component } from 'react';
import Admin from '../AdminList/Admin/Admin';
import { connect } from 'react-redux';
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from 'react-router-dom';

class AdminList extends Component {

    render() {
        let id = 1;
        return (
            <section className="menuList paddingTop">
                <div className="container">
                    <h1>admin</h1>
                    <div className="menuTable" >
                        <ul className="tableRow tableHead">
                            <li>N/N</li>
                            <li>name</li>
                            <li>last name</li>
                            <li> email</li>
                            <li>users</li>
                            <li style={{ 'width': '80px' }}>edit</li>
                        </ul>
                        {
                            this.props.administrators &&
                            this.props.administrators.map((admin, index) => {
                                return (
                                    <Admin key={index} admin={admin} idd={id++} />
                                )
                            })
                        }
                    </div>
                    <p className="addNewD">
                        <Link to='/admin'>
                            <button>back to admin page</button>
                        </Link>
                        <Link to='/adminregistration'> <button>Add Admin</button>
                        </Link>
                    </p>
                </div>
            </section>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        administrators: state.firestore.ordered.administrators,
    }
}

export default compose(connect(mapStateToProps),
    firestoreConnect([
        { collection: 'administrators' }])
)(AdminList);