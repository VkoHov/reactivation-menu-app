import React, { Component } from 'react';
import Admin from '../AdminList/Admin/Admin';
import { connect } from 'react-redux';
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import {Link} from 'react-router-dom';

class AdminList extends Component {

    render() {
console.log('esi admin listinaa',this.props)
        return (
            <div>
                
                {
                    this.props.administrators &&
                    this.props.administrators.map((admin,index)=>{
                        return(
                            <Admin key={index} admin={admin} />
                        );

                    })
                }
               <Link to='/registration'> <button>Add Admin</button>
               </Link>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        administrators: state.firestore.ordered.administrators,
    }
}

export default compose(connect(mapStateToProps),
    firestoreConnect([
        { collection: 'administrators' }
    ])
)(AdminList);
