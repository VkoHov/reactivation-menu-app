import React, { Component } from 'react';
import '../Homepage.css';
import './OurMenu.css';

class MenuItem extends Component {
    render() {
        return(
            
			<div>
				<div className="shape">
					<p><i className="fas fa-utensils"></i></p>
					<p></p>
					<p>{this.props.text}</p>
				</div>
			</div>
						
        )
    }
}


export default MenuItem