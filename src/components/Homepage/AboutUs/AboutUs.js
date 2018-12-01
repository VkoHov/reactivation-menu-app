import React, { Component } from 'react';
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
            				<img src='https://firebasestorage.googleapis.com/v0/b/menu-app-d88b1.appspot.com/o/sliderImages%2Fbaner3.jpg?alt=media&token=2fbe95dc-36fe-453a-825f-14ee8e78d4a3' alt='banner'/>
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