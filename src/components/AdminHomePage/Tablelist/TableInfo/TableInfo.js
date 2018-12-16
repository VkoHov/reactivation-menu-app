import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { clearReserveOrOrder } from '../../../../actions/clearReserveOrOrder';
import { changeTableStatus } from '../../../../actions/changeTableStatusAction';
import ReserveInfo from '../../../ReserInfo/ReserveInfo';
import OrderInfo from '../../../OrderInfo/OrderInfo';


import './TableInfo.css';



class TableInfo extends Component {
    state = {
        empty: 0,
    }

    clearReserveOrOrder = (table) => {

        this.props.clearReserveOrOrder({ id: table.target.id });

    }


    changeStatus = () => {
        const { match, firestoreInfo, changeTableStatus } = this.props;
        let index = match.params && +match.params.tableId;
        for (let i = 0; i < firestoreInfo[index - 1].reservDate.length; i++) {

            if (firestoreInfo
                && (new Date(firestoreInfo[index - 1].reservDate[i]).toDateString()) === (new Date().toDateString())) {
                changeTableStatus({ id: index, status: 'reserve' });
                this.setState({
                    empty: i,
                })
                return;
            }
        }
    }


    render() {
        const { match, firestoreInfo } = this.props;
        const { empty } = this.state
        let index = match.params && +match.params.tableId;
        let valuOfOrderskeys = [];
        let valuOfOrdersValue = [];
        let totalPrice = [];

        if (firestoreInfo && firestoreInfo[index - 1].status === 'reserve' && firestoreInfo[index - 1].reservInfo) {
            valuOfOrdersValue = firestoreInfo[index - 1].status === 'reserve'
                && Object.values(firestoreInfo
                    && firestoreInfo[index - 1].reservInfo[empty]);
            valuOfOrderskeys = firestoreInfo[index - 1].status === 'reserve'
                && Object.keys(firestoreInfo
                    && firestoreInfo[index - 1].reservInfo[empty]);
        }


        if (firestoreInfo && firestoreInfo[index - 1].status === 'busy') {
            valuOfOrderskeys = ['count', 'ingridient', 'price', 'title'];
            firestoreInfo && firestoreInfo[index - 1].orders.map(order => {
                for (let key in order) {
                    for (let kay in order[key]) {
                        if (kay === 'title' || kay === 'price' || kay === 'count' | kay === 'ingredient') {
                            valuOfOrdersValue.push(order[key][kay])
                        }
                    }
                }

                totalPrice.push(order.totalPrice);
                return '';
            })
        }


        let orderInfon = [];
        let initialInfo = [];
        for (let i = 0, j = 0; i < valuOfOrdersValue.length; i++ , j++) {
            initialInfo.push(valuOfOrdersValue[i]);
            if (j === 3) {
                orderInfon.push(initialInfo);
                initialInfo = [];
                j = -1;
            }
        }



        return (

            <section className="menuList paddingTop">
                <div className="container">
                    <div>
                        <h1>{firestoreInfo && firestoreInfo[index - 1].status} </h1>
                    </div>
                    <div className="tableInfo">
                        <div className={'info'}>
                            {
                                valuOfOrderskeys && valuOfOrderskeys.map((key, i) => {
                                    return (
                                        <div key={i + '0ll'} className={'gago'}>
                                            {
                                                key
                                            }
                                        </div>
                                    )
                                })
                            }</div>

                        <div className={'gago'}> {
                            firestoreInfo &&
                            firestoreInfo[index - 1].status === 'busy' &&
                            orderInfon.map((info, inndex) => {
                                return (
                                    < OrderInfo key={inndex} info={info} />
                                )
                            })}
                            {firestoreInfo &&
                                firestoreInfo[index - 1].status === 'busy' && totalPrice.reduce((a, b) => {
                                    return a + b
                                })}
                            {firestoreInfo &&
                                firestoreInfo[index - 1].status === 'reserve' &&
                                valuOfOrdersValue.map((valu, indeex) => {
                                    return (
                                        <ReserveInfo key={`${indeex}+`} info={valu} />
                                    )
                                })}
                        </div>
                    </div>
                </div>
                <div>
                    <div >
                        <p className="addNewD">
                            <button id={index} onClick={(table) => this.clearReserveOrOrder(table)}>
                                clear reserv/order
                            </button>
                        </p>
                    </div>
                    <div>
                        <Link to={'/admin/'}> back to homePage </Link>
                    </div>
                    <div onClick={() => { this.changeStatus() }}> check todays reserv </div>

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
        changeTableStatus: status => dispatch(changeTableStatus(status)),
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    firestoreConnect([
        { collection: 'tables' }
    ])
)(TableInfo);

