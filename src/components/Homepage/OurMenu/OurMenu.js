import React, { Component } from 'react';
import MenuItem from './MenuItem';
import '../Homepage.css';
import './OurMenu.css';

class OurMenu extends Component {
    render() {
        return(
            <section >
	            <div className="container">
	            	<h1> our <span>menu</span></h1>
	            	<div className="ourMenu">
						<MenuItem text={"steak and more"}/>
						<MenuItem text={"grill and more"}/>
						<MenuItem text={"sallads and more"}/>
				    </div>
	            	<div className="ourMenu">
						<MenuItem text={"steak and more"}/>
						<MenuItem text={"grill and more"}/>
						<MenuItem text={"sallads and more"}/>
				    </div>
				</div>
            </section>
        )
    }
}


export default OurMenu