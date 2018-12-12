import React, { Component } from 'react';


class OrderInfo extends Component {

    render() {
        console.log('horoxper inch ka qeznic', this.props.info);
        return (
            <div>
                {
                    this.props.info && this.props.info.map((dishInfo)=>{
                        return(
                            dishInfo
                        )
                    })
                }
            </div>
        );
    }

}

export default OrderInfo;