import React, { Component } from 'react';
import Table from './Table/Table';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import '../Tablelist/TableList.css';

class TableLIst extends Component {
    render() {
        return (
            <div>
                {this.props.firestoreInfo &&
                this.props.firestoreInfo.map((tablee, index) => {
                        return (
                            < Table key={index} tablee={tablee} className={`${tablee.tabelStatus}`} index={index} />
                        );
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tableInfo: state.tableInfo,
        firestoreInfo: state.firestore.ordered.tables,
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'tables'}
    ])
)(TableLIst);