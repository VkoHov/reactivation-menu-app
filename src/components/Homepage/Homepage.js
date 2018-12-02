import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import OurMenu from './OurMenu/OurMenu';
import Booking from './Booking/Booking';
import AboutUs from './AboutUs/AboutUs';
import Footer from './Footer/Footer';
import HeaderSlider from './HomepageSlider/HomepageSlider';
import {connect} from 'react-redux';
import './Homepage.css';

class Homepage extends Component {
    
    componentDidMount() {
        scrollToComponent(this.HeaderSlider, {});
    }
    componentDidUpdate(){
        switch (this.props.sliderstatus){
            case 'ourmenu':
                scrollToComponent(this.OurMenu, {offset:-100,align:'top'});
                break;
            case 'reservation':
                scrollToComponent(this.Booking, {offset:-100,align:'top'});
                break;
            case 'aboutus':
                scrollToComponent(this.AboutUs, {offset:-100,align:'top'});
                break;
            case 'contact':
                scrollToComponent(this.Footer, {});
                break;
            default:
                scrollToComponent(this.HeaderSlider, {});
        }
    }
    render() {
        console.log(this.props.sliderstatus);
        return(
            <div className='homepage'>
                 <HeaderSlider ref={(section) => { this.HeaderSlider = section; }}/>
                 <OurMenu ref={(section) => { this.OurMenu = section; }} />
                 <Booking ref={(section) => { this.Booking = section; }} />
                 <AboutUs ref={(section) => { this.AboutUs = section; }}/>
                 <Footer ref={(section) => { this.Footer = section; }}/>

            </div>
        )
    }
    
}

const mapStateToProps = state => {
    return{
        sliderstatus: state.navbar.sliderId,
    }
};
export default connect(mapStateToProps)(Homepage);