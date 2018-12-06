import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import '../Table/Table.css';

class Table extends Component {
    render() {
        let src="";
        if(this.props.tablee.status =="free" ){
            src =  "https://firebasestorage.googleapis.com/v0/b/menu-app-d88b1.appspot.com/o/table%20image%2FTable.png?alt=media&token=27b21d24-adf7-4dae-bdd2-915f11179a72";
        } else if(this.props.tablee.status =="busy"){
            src =  "https://firebasestorage.googleapis.com/v0/b/menu-app-d88b1.appspot.com/o/table%20image%2FTable-red.png?alt=media&token=83bca6c5-98fe-4c2c-b746-3171784f914e";
        } else {
            src="https://firebasestorage.googleapis.com/v0/b/menu-app-d88b1.appspot.com/o/table%20image%2FTable-red---Copy.png?alt=media&token=30ec01cc-f1db-45f5-b243-f8153ebccbd8";
        }
        return (
            <div className={`${this.props.className} tableImg`}>

                <Link to={`/admin/table/${this.props.tablee.id}`}>
                    <span>Table {this.props.tablee.id}</span>
                    <img src={src }/>
    </Link>

            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        tables: state.firestore.ordered.tables
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "dishes" }
    ])
)(Table);