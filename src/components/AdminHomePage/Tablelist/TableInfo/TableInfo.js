import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { clearReserveOrOrder } from '../../../../actions/clearReserveOrOrder';


import './TableInfo.css';

class TableInfo extends Component {


    clearReserveOrOrder = (table) => {
        this.props.clearReserveOrOrder({ id: table.target.id });
    }




    render() {

        let index = this.props.match.params && +this.props.match.params.tableId;
        let valuOfOrderskeys = [];
        let valuOfOrdersValue = [];

        if (this.props.firestoreInfo && this.props.firestoreInfo[index - 1].status === 'reserve') {
            valuOfOrderskeys = this.props.firestoreInfo && Object.keys(this.props.firestoreInfo[index - 1].orders[0]);
            valuOfOrdersValue = this.props.firestoreInfo && Object.values(this.props.firestoreInfo[index - 1].orders[0]);
        } else if (this.props.firestoreInfo && this.props.firestoreInfo[index - 1].status === 'busy') {
            valuOfOrderskeys = this.props.firestoreInfo && Object.keys(this.props.firestoreInfo[index - 1].orders[0][0]);
            valuOfOrdersValue = this.props.firestoreInfo && Object.values(this.props.firestoreInfo[index - 1].orders[0][0]);
        }
        return (

            <section className="menuList paddingTop">
                <div className="container">
                    <div>
                        <h1>{this.props.firestoreInfo && this.props.firestoreInfo[index - 1].status} </h1>
                    </div>




                    <div className="" >
                        <ul className="tableInfo">
                            <li><span>{valuOfOrderskeys[0]}:</span><p>{valuOfOrdersValue[0]}</p></li>
                            <li><span>{valuOfOrderskeys[7]}:</span><p>{valuOfOrdersValue[7]}</p></li>
                            <li><span>{valuOfOrderskeys[1]}:</span><p>{valuOfOrdersValue[1]}</p></li>
                            <li><span> {valuOfOrderskeys[4]}:</span><p>{valuOfOrdersValue[4]}</p></li>
                            <li> <span>{valuOfOrderskeys[2]}:</span><p>{valuOfOrdersValue[2]}</p></li>
                            <li> <span>{valuOfOrderskeys[5]}:</span><p>{valuOfOrdersValue[5]}</p></li>
                        </ul>
                    </div>


                    <p class="addNewD">
                        <a href="/admin">
                        <button id={index} onClick={(table) => this.clearReserveOrOrder(table)}>
                            clear reserv/order
                            </button>
                        </a>
                        <a href="/registration">
                            <button>Add Admin</button></a>
                    </p>
                </div>
            </section>
        )
    }
}



const mapStateToProps = state => {
    return {
        firestoreInfo: state.firestore.ordered.tables,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearReserveOrOrder: table => dispatch(clearReserveOrOrder(table)),
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'tables' }
    ])
)(TableInfo);