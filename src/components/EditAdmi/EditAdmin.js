import React from 'react';
import {Link} from "react-router-dom";

const EditAdmin = () => {
    return (
        <div>
            <Link to={'/adminregistration'}> Add Admin</Link>
            <Link to={'/admin/'}> back to homePage </Link>
        </div>
    )
};
export default EditAdmin;