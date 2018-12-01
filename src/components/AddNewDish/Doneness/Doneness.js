import React, {Component} from 'react';
class Doneness extends Component {

    state = {
        doneness: [''],

    };

    addNewDoneness = () => {
        this.setState({
            doneness: this.state.doneness.concat(['']),
        });
    };

    addDoneness(e){
        let temp = this.state.doneness;
        let key = e.target.getAttribute('inpid');
        let value = e.target.value;
        temp[key] = value;
        this.setState({
            doneness: temp,
        });
        this.props.changedDonnesArr(temp);
    }
    render() {
        return (
            <div className="doneness">
                {this.state.doneness.map((inp,index)  => {
                    return (
                    <p key={index}>
                        <input
                            inpid = {index}
                            id = {"doneness " + index}
                            type = "text"
                            placeholder = "Doneness"
                            onChange = {(e) => {this.addDoneness(e)}}
                        />
                    </p>)
                })}

                <span onClick={this.addNewDoneness}>+</span>
            </div>
        )
    }
}

export default Doneness;