import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";


class TableInfo extends Component {
    render() {
        return (
            <div>
                aystex petqe lini info sexani masin;
                kam
                aystex karox e linel dzer govazdy;
                <div>
                    <Link to={'/admin/'}> back to homePage </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tableInfo: state.tableInfo,
    }
}


export default connect(mapStateToProps)(TableInfo);