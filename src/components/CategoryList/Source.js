import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Homepage from '../Homepage/Homepage'
class Source extends Component {
    render() {
        return (
            <section className="source">
            	<div className="container">
	            	<p>
	                	<Link to='/'> Home</Link>
	                	<span>/</span>
	                	{this.props.categoryName}
	            	</p>
	            	<p>
	            		18 of 154
	            	</p>
	            </div> 
            </section>
        );
    }
}
export default Source;