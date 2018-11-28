import React, { Component } from "react";
import DishDetails from "../../../../DishDetails";
import '../../../../DishDetails.css'
class Dish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false
    };
    this.showPopUp = this.showPopUp.bind(this);
  }
  showPopUp = () => {
    this.setState({
      showPopUp: !this.state.showPopUp
    });
  };
  render() {
    return (
      <div >
        <div onClick={this.showPopUp}>{this.props.dish.title}</div>
        {this.state.showPopUp && <DishDetails className = "pop-Up" dishInfo={this.props} />}
      </div>
    );
  }

}
export default Dish;
