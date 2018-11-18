import React, { Component } from 'react';
import { Link } from "react-router-dom";
import TableLIst from './Tablelist/TableList';



class AdminHomePage extends Component {

    render() {
        return (
            <div>
                <Link to='/admin/editadmin'><li>Edit Admin </li> </Link>
                <Link to='/admin/editmanu'> <li>Edit Meniu </li> </Link>
                <TableLIst />
            </div>
        );
    }

}

export default AdminHomePage;