import React, { Component } from 'react';
import Table from './Table/Table';
import { connect } from 'react-redux';

import '../Tablelist/TableList.css';

class TableLIst extends Component {
    render() {
        console.log('esi table infonaaaa', this.props.tableInfo.info)
        return (
            <div>
                {this.props.tableInfo.info &&
                    this.props.tableInfo.info.map((tablee, index) => {
                        return (
                            < Table key={index} tablee={tablee} className={`${tablee.tabelStatus}`} />
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
    }
}


export default connect(mapStateToProps)(TableLIst);