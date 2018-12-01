import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteAdmin } from  '../../../actions/deleteAdminAction';
import { compose } from 'redux';






class Admin extends Component {

    deleteAdmin = () => {

        this.props.deleteAdmin({ id:this.props.admin} );
    }

    render() {
        console.log('esi admini propsnkSBHC', this.props)
        return (
            <div >
                {
                    this.props.admin.name
                }

                <div onClick={this.deleteAdmin}>
                    Delete Admin
                    </div>
                    
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



export default compose(connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        { collection: 'administrators' }
    ])
)(Admin);


// 