// import React, { Component } from 'react';
// import LogoutLayout from '../LogoutLayout/LogoutLayout';
// import { connect } from 'react-redux'
// import { Link } from 'react-router-dom';

// class FavoriteLayout extends Component {

//     render() {
//         let userId = this.props.auth.uid;

//         let favorites =
//             (this.props.firestoreInfo &&
//                 this.props.firestoreInfo[userId] &&
//                 this.props.firestoreInfo[userId].favorites) ||
//             null;

// console.log(favorites)

//         return (
//             <div>


//             </div>
//         )

//     }
// }

// const mapStateToProps = state => {
//     return {
//         authID: state.firebase.auth.uid,

//     }
// };
// export default connect(mapStateToProps)(FavoriteLayout);