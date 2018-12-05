import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import '../Table/Table.css';

const Table = props => {console.log(props)
    return (
        <div className={`${props.className} tableImg`}>
        
            <Link to={`/admin/table/${props.tablee.id}`}>
            <span>Table {props.tablee.id}</span>
                <img src = {props.tablee.status =="busy" ?
                        "https://firebasestorage.googleapis.com/v0/b/menu-app-d88b1.appspot.com/o/table%20image%2FTable.png?alt=media&token=27b21d24-adf7-4dae-bdd2-915f11179a72"
                    : "https://firebasestorage.googleapis.com/v0/b/menu-app-d88b1.appspot.com/o/table%20image%2FTable-red.png?alt=media&token=83bca6c5-98fe-4c2c-b746-3171784f914e"
    }/></Link>
            
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