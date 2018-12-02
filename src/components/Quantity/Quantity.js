import React, {Component} from 'react';

class Quantity extends Component {
    state = {
        count: this.props.count,
        price: this.props.price,
        dishInfo: JSON.parse(sessionStorage.getItem("dishInfo")),
        totalPrice:null,
    };
    minusCount = () => {
        if (this.state.count > 1) {
            let infoarr = JSON.parse(sessionStorage.getItem('dishInfo'));
            let currentCount = infoarr[this.props.index].count;
             currentCount--;
           infoarr[this.props.index].count = currentCount;
             sessionStorage.setItem("dishInfo",JSON.stringify(infoarr));
             this.setState({
                 count: currentCount,
             })
        }this.props.update(this.state.count);
    };

    plusCount = () => {
       let infoarr = JSON.parse(sessionStorage.getItem('dishInfo'));
      let currentCount = infoarr[this.props.index].count;
      currentCount++;
         infoarr[this.props.index].count = currentCount;
        sessionStorage.setItem("dishInfo",JSON.stringify(infoarr));
        this.setState({
            count: currentCount,
        });
        this.props.update(this.state.count);
        console.log(infoarr)
    };

    render() {
     
        return (
            <div className="countDish">
                <span>SUBTOTAL: {this.state.price * this.state.count}(AMD)</span>
                <button className="count-button" onClick={this.minusCount}> -

                </button>
                <button className="count-button">{this.state.count}</button>
                <button className="count-button" onClick={this.plusCount.bind(this)}> +
                </button>
            </div>
        );
    }
}

export default Quantity;