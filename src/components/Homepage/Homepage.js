import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import OurMenu from './OurMenu/OurMenu';
import Booking from './Booking/Booking';
import AboutUs from './AboutUs/AboutUs';
import Footer from './Footer/Footer';
import HeaderSlider from './HomepageSlider/HomepageSlider';
import './Homepage.css';

class Homepage extends Component {
    
    componentDidMount() {
        scrollToComponent(this.HeaderSlider, {});
    }
    componentDidUpdate(){
        switch (this.state.sliderstatus){
            case 'OurMenu':
                scrollToComponent(this.Booking, {});
                break;
            case 'Booking':
                scrollToComponent(this.OurMenu, {});
                break;
            case 'AboutUs':
                scrollToComponent(this.AboutUs, {});
                break;
            case 'Contact':
                scrollToComponent(this.Footer, {});
                break;
            default:
                scrollToComponent(this.HeaderSlider, {});
        }
    }
    render() {
        return(
            <div>
                 <HeaderSlider ref={(section) => { this.HeaderSlider = section; }}/>
                 <OurMenu ref={(section) => { this.OurMenu = section; }} />
                 <Booking ref={(section) => { this.Booking = section; }} />
                 <AboutUs ref={(section) => { this.AboutUs = section; }}/>
                 <Footer ref={(section) => { this.Footer = section; }}/>

            </div>
        )
    }
    
}
export default Homepage