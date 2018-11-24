import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../Homepage.css';
import './Footer.css';

class Footer extends Component {
    render() {
        return(
            <footer>
               <div className="footerShape">
               		<div className="container">
               			<div className="foot">
               				<div>
	               				<a className="logo" href="/">
	               					Steak <span>&</span> Grill
	               				</a>
               				</div>
               				<div>
               					<h4>cotact info</h4>
               					<ul>
               						<li>
               							<span><i className="fas fa-map-marker-alt"></i></span>
               							Yerevan, Abovyan 23/2
               						</li>
               						<li>
               							<span><i className="fas fa-mobile-alt"></i></span>
               							+37477334455
               						</li>
               						<li>
               							<span><i className="fas fa-envelope"></i></span>
               							steak&grill@botMAil.com
               						</li>
               					</ul>
               				</div>	
               				<div>
               					<h4>opeig hours</h4>
               					<ul>
               						<li>
               							Mon-Thu:09:00-24:00

               						</li>
               						<li>
               							Fri-Sun:09:00-24:00
               						</li>
               						
               					</ul>
               				</div>	
               				<div>
               					<h4>followus</h4>
               					<ul>
               						<li>
               							<Link to="">
	               							<span><i className="fab fa-facebook-square"></i></span>
	               							Facebook
	               						</Link>
               						</li>
               						<li>
               							<Link to="">
	               							<span><i className="fab fa-instagram"></i></span>
	               							Instagram
	               						</Link>
               						</li>
               						<li>
               							<Link to="">
	               							<span><i className="fab fa-twitter"></i></span>
	               							Twitter
	               						</Link>
               						</li>
               					</ul>
               				</div>

               			</div>
               		</div>
               </div>
            </footer>
        )
    }
}
export default Footer