import React, { Component } from 'react';


class ReserveInfo extends Component {

    render() {

        return (
            <div>
                {
                    this.props.info
                }
            </div>
        );
    }

}

export default ReserveInfo;