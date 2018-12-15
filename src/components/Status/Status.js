import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { addToFirestore } from "../../actions/addToFireStoreAction";
import {withRouter} from 'react-router-dom';
import "./Status.css";

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popUpIsOpen: false,
      tableNumber: " ",
    };
    this.showPopUp = this.showPopUp.bind(this);
  }
  hendleChange(e) {
      this.setState({
        tableNumber: e.target.value
      });
    
    
  }
  handleClick(info) {
    if (this.state.tableNumber > 0 && this.state.tableNumber < 7) {
      let status = this.props.tables;
      status.map(table => {
        if (table.id === this.state.tableNumber) {
          alert("Your order recieved");
          this.props.addToFirestore(info);
        } 
        this.props.remove();
        this.props.history.push('/');
      });
    }
  }

  showPopUp = () => {
    this.setState({
      popUpIsOpen: !this.state.popUpIsOpen
    });
  };
  render() {
    let info = {
      tableNumber: this.state.tableNumber,
      totalPrice: this.props.totalPirce,
      ...this.props.dish
    };
    return (
      <div>
        <label>
          <input
            min="1"
            max="6"
            onChange={e => this.hendleChange(e)}
            type="number"
            style={{ minWidth: "185px" }}
            placeholder="Choose the number of table"
          />
          <button onClick={() => this.handleClick(info)}>Order</button>
        </label>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    tables: state.firestore.ordered.tables
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addToFirestore: info => dispatch(addToFirestore(info))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    ),
    withRouter,
  firestoreConnect([{ collection: "tables" }])
)(Status);
