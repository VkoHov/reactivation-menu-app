import React, { Component } from 'react';


class OrderInfo extends Component {

    render() {
        console.log('horoxper inch ka qeznic', this.props.info);
        return (
            <div>
                <p>
                    {
                        this.props.info && this.props.info.map((dishInfo) => {
                            return (
                                dishInfo
                            )
                        })
                    }
                </p>
            </div>
        );
    }

}

export default OrderInfo;