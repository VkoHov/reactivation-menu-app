import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import '../Table/Table.css';

const Table = props => {
    console.log(this.props)
    return (
        <div className={`${props.className}`}>
            <Link to={`/admin/table/${props.tablee.tableId}`}>
                Table
            </Link>
            
        </div>
    )

}
const mapStateToProps = state => {
    return {
        tables: state.firestore.ordered.tables
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: "dishes"}
    ])
)(Table);