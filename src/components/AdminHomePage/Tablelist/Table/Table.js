import React from 'react';
import { Link } from "react-router-dom";

import '../Table/Table.css';

const Table = props => {
    console.log('esi tablei propsna', props);
    return (

        <div className={`${props.className}`} >

            <Link to={`/admin/table/${props.tablee.tableId}`}>
                Table
     </Link>
        </div>
    )

}

export default Table;