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

        this.props.clearReserveOrOrder({ id: table.target.id });

        this.setState({
            empty: 1,
        })

    }

    componentDidMount() {
        this.changeStatus();

    }

    changeStatus = () => {
        // let index = this.props.match.params && +this.props.match.params.tableId;
        // if (this.props.firestoreInfo && new Date(this.props.firestoreInfo[index - 1].reservInfo[0].date).getMilliseconds() === 0) {
        //     this.props.changeTableStatus({id: index, status: 'reserve'});
        //     console.log('exav');
        // } else {
        //     this.props.changeTableStatus({id: index, status: 'free'});
        // }

    }


    render() {

        console.log('as78954', this.props);
        console.log(this.state, 'statena');


        let index = this.props.match.params && +this.props.match.params.tableId;
        let valuOfOrderskeys = [];
        let valuOfOrdersValue = [];
        if (this.props.firestoreInfo && this.props.firestoreInfo[index - 1].status === 'reserve') {
            valuOfOrderskeys = this.props.firestoreInfo && Object.keys(this.props.firestoreInfo[index - 1].reservInfo[0]);
            valuOfOrdersValue = this.props.firestoreInfo && Object.values(this.props.firestoreInfo[index - 1].reservInfo[0]);
        } else if (this.props.firestoreInfo && this.props.firestoreInfo[index - 1].status === 'busy') {
            valuOfOrderskeys = ['title', 'ingridient', 'count', 'price'];
            console.log('444gexam',this.props.firestoreInfo &&this.props.firestoreInfo  )
            this.props.firestoreInfo && this.props.firestoreInfo[index-1].orders.map(order => {
           console.log( order,'smbo' )
                for (let key in order) {
                    console.log('order[key]:::',order[key],'key::::',key);
                    for (let kay in order[key]) {
                        console.log('kay::::',kay)
                            if ((kay === 'title'
                            || kay === 'price'
                            || kay === 'count'
                            || kay === 'ingredient')
                            && valuOfOrdersValue.push(order[key][kay]));
                    }
                }
            })
        }



        console.log(valuOfOrdersValue&&valuOfOrdersValue,'grxam')
        return (
            <div>
                <div>
                    <h1>{this.props.firestoreInfo && this.props.firestoreInfo[index - 1].status} </h1>
                </div>
                <div className={'info'}>
                    {
                        valuOfOrderskeys && valuOfOrderskeys.map((key, i) => {
                            return (
                                <div key={i + '0ll'}>
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
                                <div key={i + '0l'}>
                                    {val}
                                </div>
                            );
                        })
                    }
                </div>
                <div>

                    <section className="menuList paddingTop">
                        <div className="container">
                            <div>
                                <h1>{this.props.firestoreInfo && this.props.firestoreInfo[index - 1].status} </h1>
                            </div>


                            <div className="">
                                <ul className="tableInfo">
                                    <li><span>{valuOfOrderskeys[0]}:</span><p>{valuOfOrdersValue[0]}</p></li>
                                    <li><span>{valuOfOrderskeys[7]}:</span><p>{valuOfOrdersValue[7]}</p></li>
                                    <li><span>{valuOfOrderskeys[1]}:</span><p>{valuOfOrdersValue[1]}</p></li>
                                    <li><span> {valuOfOrderskeys[4]}:</span><p>{valuOfOrdersValue[4]}</p></li>
                                    <li><span>{valuOfOrderskeys[2]}:</span><p>{valuOfOrdersValue[2]}</p></li>
                                    <li><span>{valuOfOrderskeys[5]}:</span><p>{valuOfOrdersValue[5]}</p></li>
                                </ul>
                            </div>

                            <div >
                                <p className="addNewD">
                                    <button id={index} onClick={(table) => this.clearReserveOrOrder(table)}>
                                        clear reserv/order
                                     </button>
                                </p>
                            </div>


                        </div>

                        <div>
                            <Link to={'/admin/'}> back to homePage </Link>
                        </div>

                    </section>
                </div>
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





