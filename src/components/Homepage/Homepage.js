import React, { Component } from 'react';
// import scrollToComponent from 'react-scroll-to-component';

import Header from './Header/Header';
import OurMenu from './OurMenu/OurMenu';
import Booking from './Booking/Booking';
import AboutUs from './AboutUs/AboutUs';
import Footer from './Footer/Footer';

import './Homepage.css';

class Homepage extends Component {

    render() {

        return(
            <div>
               <Header />
               <OurMenu />
               <Booking />
               <AboutUs />
               <Footer />

            </div>
        )
    }
}
export default Homepage