import React, { Component } from 'react';
import './OrderInfo.css';

class OrderInfo extends Component {

    render() {
        console.log('horoxper inch ka qeznic', this.props);
        return (
            <div> 
                < div>
                {
                    this.props.info && this.props.info.map((dishInfo,index) => {
                        return (

                            <div key={`${index}`} className={'orders'}>
                                {
                                    dishInfo

                                }
                            </div>
                        )
                    })
                }
                </div>
                <div>
                    <p>
                    {
                        this.props.totalPrice &&this.props.totalPrice[0]
                    }
                    </p>
                </div>

            </div>
        );
    }

}

export default OrderInfo;