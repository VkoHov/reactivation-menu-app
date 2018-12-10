import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteAdmin } from '../../../actions/deleteAdminAction';
import { compose } from 'redux';






class Admin extends Component {
    deleteAdmin = () => {
        if (window.confirm("Are you sure")) {
            this.props.deleteAdmin({ id: this.props.admin });
        } 
    }
    render() {
        let info = this.props.admin;
        let bgcolor = this.props.idd % 2 === 0 ? " #FFF2DF" : '#fff';
        return (
            <div >

                <ul className="tableRow " style={{ background: `${bgcolor}` }}>
                    <li>{this.props.idd}</li>
                    <li>{info.name}</li>
                    <li>{info.lastname}</li>
                    <li>{info.email}</li>
                    <li>Admin</li>
                    <li onClick={this.deleteAdmin} style={{ 'width': '80px' }}>
                        <i className="far fa-trash-alt"></i>
                    </li>
                </ul>

            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        administrators: state.firestore.ordered.administrators,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteAdmin: admin => dispatch(deleteAdmin(admin.id)),
    };
};



export default compose(connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'administrators' }
    ])
)(Admin);


