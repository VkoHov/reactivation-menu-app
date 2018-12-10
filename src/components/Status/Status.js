import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { addToFirestore } from "../../actions/addToFireStoreAction";
import "./Status.css";

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popUpIsOpen: false,
      tableNumber: " ",
      // userId: this.props
    };
    this.showPopUp = this.showPopUp.bind(this);
  }
  hendleChange(e) {
    console.log("changing");
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
        } else if(table.id !== this.state.tableNumber ) {
          console.log("urishi sexanin patver mi ara,kamel es sexanin patver ka");
        }
        return (
          <div>
            <label className="status">
              <input
                min="1"
                max="6"
                onChange={e => this.hendleChange(e)}
                type="number"
                placeholder="Choose the number of table"
              />
              <p className="emptyCart">
              <button  onClick={() => this.handleClick(info)}>Order</button>
              </p>
             
              
            </label>
          </div>
        );
      });
    }
  }

  showPopUp = () => {
    this.setState({
      popUpIsOpen: !this.state.popUpIsOpen
    });
  };
  render() {
    console.log("info", this.props.firebase.authUid);
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
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "tables" }])
)(Status);
