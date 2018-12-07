import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { clearReserveOrOrder } from '../../../../actions/clearReserveOrOrder';
import { changeTableStatus } from '../../../../actions/changeTableStatusAction';

import './TableInfo.css';


class TableInfo extends Component {
    state = {
        empty: 0,
    }

    clearReserveOrOrder = (table) => {
        let prom = this.props.clearReserveOrOrder({ id: table.target.id });
        prom.then(() => {
            this.setState({
                empty: 1,
            })
        })
    }
    componentDidMount () {
        this.changeStatus();

    }

    changeStatus = () => {
        let index = this.props.match.params && +this.props.match.params.tableId;
        if (this.props.firestoreInfo && new Date(this.props.firestoreInfo[index - 1].reservInfo[0].date).getMilliseconds() === 0) {
            this.props.changeTableStatus({ id: index, status: 'reserve' });
            console.log('exav');
        }else{
            this.props.changeTableStatus({ id: index, status: 'free' });
        }

    }



    render() {

        console.log('as78954', this.props);

        let index = this.props.match.params && +this.props.match.params.tableId;
        let valuOfOrderskeys = [];
        let valuOfOrdersValue = [];
        if (this.props.firestoreInfo && this.props.firestoreInfo[index - 1].status === 'reserve') {
            valuOfOrderskeys = this.props.firestoreInfo && Object.keys(this.props.firestoreInfo[index - 1].reservInfo[0]);
            valuOfOrdersValue = this.props.firestoreInfo && Object.values(this.props.firestoreInfo[index - 1].reservInfo[0]);
        } else if (this.props.firestoreInfo && this.props.firestoreInfo[index - 1].status === 'busy') {
            valuOfOrderskeys = ['title', 'ingridient', 'count', 'price'];
            this.props.firestoreInfo && this.props.firestoreInfo[0].orders.map(order => {
                for (let key in order) {
                    for (let kay in order[key]) {
                        if (kay === 'title' || kay === 'price' || kay === 'count' || kay === 'ingredient') {
                            valuOfOrdersValue.push(order[key][kay]);
                        }
                    }
                }
            })
        }
        return (
            <div>
                <div>
                    <h1>{this.props.firestoreInfo && this.props.firestoreInfo[index - 1].status} </h1>
                </div>
                <div className={'info'}>
                    {
                        valuOfOrderskeys && valuOfOrderskeys.map((key, i) => {
                            return (
                                <div key={i + '0ll'} >
                                    {
                                        key
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div className={'info'}>
                    {
                        valuOfOrdersValue && valuOfOrdersValue.map((val, i) => {
                            return (
                                <div key={i + '0l'} >
                                    {val}
                                </div>
                            );
                        })
                    }
                </div>
                <div>
                    <button id={index} onClick={(table) => this.clearReserveOrOrder(table)}>
                        clear reserv/order
                            </button>
                </div>
                <div>
                    <Link to={'/admin/'}> back to homePage </Link>
                </div>
                {/* <button onClick={this.changeStatus}>gakhgasicgaks </button> */}
            </div>
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