import React, { Component } from 'react';
import { Link } from "react-router-dom";

import '../Table/Table.css';

class Table extends Component {
   
      
    render() {
     
        return (
            <div className={`${this.props.className}`}>
                <Link to={`/admin/table/${this.props.tablee.id}`}>
                    Table
            </Link>
                
            </div>
        )
    }
}

export default Table;