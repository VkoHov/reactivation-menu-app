import React, { Component } from 'react';
import OurMenu from './OurMenu/OurMenu';
import Booking from './Booking/Booking';
import AboutUs from './AboutUs/AboutUs';
import Footer from './Footer/Footer';
import HeaderSlider from './HomepageSlider/HomepageSlider';

import './Homepage.css';

class Homepage extends Component {

    render() {
        return(
            <div className='homepage'>
               
               <HeaderSlider/>
               <OurMenu />
               <Booking />
               <AboutUs />
               <Footer />
            </div>
        )
    }
}
export default Homepage