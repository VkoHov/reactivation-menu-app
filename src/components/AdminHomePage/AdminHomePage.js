import React, { Component } from 'react';
import { Link } from "react-router-dom";
import TableLIst from './Tablelist/TableList';
import "./AdminHomePage.css";
class AdminHomePage extends Component {

    render() {
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

export default AdminHomePage;