import React, { Component } from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {addToFirestore} from "../../actions/addToFireStoreAction"
class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popUpIsOpen: false,
            tableNumber: " ",
        };
     this.showPopUp = this.showPopUp.bind(this);
    }
    hendleChange(e){
       
            console.log("changing")
            this.setState({
                tableNumber: e.target.value ,
            })
    }
    handleClick(info){
        if(this.state.tableNumber > 0 && this.state.tableNumber < 7){
            console.log('mtnuma')
         this.props.addToFirestore(info);
        }
     }
    showPopUp = () => {
        this.setState({
            popUpIsOpen: !this.state.popUpIsOpen,
        })
    }
    render(){
        console.log("state table",this.state.tableNumber)
        let info = {
            tableNumber: this.state.tableNumber ,  
              ...this.props.dish,
        }
        return(
             <div>
                <label>
                    <input min = "1" max = "6" onChange = {(e)=>this.hendleChange(e)} type = 'number'  placeholder="Choose the number of table"/>
                    <button onClick={()=> this.handleClick(info)}>Order</button>
                    <button> Buy Online</button>
                </label>
             </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        tables: state.firestore.ordered.tables
    };
};
 const mapDispatchToProps = dispatch => {
     return {
       addToFirestore: info => dispatch(addToFirestore(info)),
    };
 };
export default compose(
 connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: "tables"}
    ]))(Status);
