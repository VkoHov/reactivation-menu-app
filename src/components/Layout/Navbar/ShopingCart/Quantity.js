import React, { Component } from 'react';
class Quantity extends Component {
    state = {
        count: this.props.count,
        price: this.props.price,
    }
    minusCount = e => {
        if (this.state.count > 1) {
          this.setState({
            count: this.state.count - 1
          });
        }
      };
    
      plusCount = e => {
         
        this.setState({
          count: this.state.count + 1
        });
      };
    render() { 
        if(this.state.count > 1){
            return (<div>
            
                <span>SUBTOTAL: {this.state.price * this.state.count}(AMD)</span> 
                <button className="count-button" onClick={this.minusCount}> -
                    </button>
                    <button className="count-button">{this.state.count}</button>
                    <button className="count-button" onClick={this.plusCount}> +
                    </button>
                 </div>
             );
        }else{
            return(
                <div>
                <button className="count-button" onClick={this.minusCount}> -
                    </button>
                    <button className="count-button">{this.state.count}</button>
                    <button className="count-button" onClick={this.plusCount}> +
                    </button>
                </div>
            )
        }
        
    }
}
 
export default Quantity;