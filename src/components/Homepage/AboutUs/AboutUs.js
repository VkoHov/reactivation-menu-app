import React, { Component } from 'react';

import Baner2 from '../images/baner2.jpg'
import './../Homepage.css';
import './AboutUs.css';

class AboutAs extends Component {
    render() {
        return(
            <section className="aboutAs" ref={(section) => { this.aboutAs = section; }}>
            	<div className="container">
            		<h1>about <span>us</span></h1>
            		<div className="about">
            			<div>
            				<img src={Baner2} alt='banner'/>
            			</div>
            			<ul>
            				<li>
            					<h3>who are we</h3>
            					<p>Lorem Ipsum is simply dummy text 
            					of the printing and typesetting industry. 
            					Lorem Ipsum has been the industry's standard 
            					dummy text ever since the 1500s,</p>
            				</li>
            				<li>
            					<h3>our vision</h3>
            					<p>Lorem Ipsum is simply dummy text 
            					of the printing and typesetting industry. 
            					Lorem Ipsum has been the industry's standard 
            					dummy text ever since the 1500s,</p>
            				</li>
            				<li>
            					<h3>specification</h3>
            					<p>Lorem Ipsum is simply dummy text 
            					of the printing and typesetting industry. 
            					Lorem Ipsum has been the industry's standard 
            					dummy text ever since the 1500s,</p>
            				</li>
            			</ul>
            		</div>
            	</div>
            </section>
        )
    }
}
export default AboutAs