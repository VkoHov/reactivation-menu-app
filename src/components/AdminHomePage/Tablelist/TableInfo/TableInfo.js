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

        this.setState({
            empty: 1,
        })

    }


    changeStatus = () => {
        let index = this.props.match.params && +this.props.match.params.tableId;
        for (let i = 0; i < this.props.firestoreInfo[index - 1].reservDate.length; i++) {

            if (this.props.firestoreInfo && (new Date(this.props.firestoreInfo[index - 1].reservDate[i]).toDateString()) === (new Date().toDateString())) {
                this.props.changeTableStatus({ id: index, status: 'reserve' });
                this.setState({
                    empty: i,
                })
                return;
            }
        }
    }


    render() {
        let index = this.props.match.params && +this.props.match.params.tableId;
        let valuOfOrderskeys = [];
        let valuOfOrdersValue = [];
        let totalPrice=[];
        if (this.props.firestoreInfo && this.props.firestoreInfo[index - 1].status === 'reserve') {
            valuOfOrdersValue = Object.values(this.props.firestoreInfo && this.props.firestoreInfo[index - 1].reservInfo[this.state.empty]);
            valuOfOrderskeys = Object.keys(this.props.firestoreInfo && this.props.firestoreInfo[index - 1].reservInfo[this.state.empty]);
        }


        if (this.props.firestoreInfo && this.props.firestoreInfo[index - 1].status === 'busy') {
            valuOfOrderskeys = ['count', 'ingridient' ,'price', 'title'];
            this.props.firestoreInfo && this.props.firestoreInfo[index - 1].orders.map(order => {
                for (let key in order) {
                    for (let kay in order[key]) {
                        if (kay === 'title' || kay === 'price' || kay === 'count' | kay === 'ingredient') {
                            valuOfOrdersValue.push(order[key][kay])
                        }
                    }
                }

                totalPrice.push(order.totalPrice);
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
                    <h1>{this.props.firestoreInfo && this.props.firestoreInfo[index - 1].status} </h1>
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
                        this.props.firestoreInfo && 
                        this.props.firestoreInfo[index - 1].status === 'busy' &&
                        orderInfon.map((info, inndex) => {
                            return (
                                < OrderInfo key={inndex} info={info}  totalPrice={totalPrice}/>
                            )
                        })
                    }
                        {
                            this.props.firestoreInfo &&
                            this.props.firestoreInfo[index - 1].status === 'reserve'&&
                            valuOfOrdersValue.map( (valu,indeex)=>{
                                return(
                                    <ReserveInfo key={`${indeex}+`} info={valu} />
                                )
                            } )
                        }
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

