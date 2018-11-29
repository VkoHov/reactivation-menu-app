import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
 
import Baner1 from '../images/baner1.jpg';
import Baner2 from '../images/baner2.jpg';
import Baner3 from '../images/baner3.jpg';
import '../Homepage.css'
class HeaderSlider extends Component {
    render() {
        return (
            <Carousel
                infiniteLoop = {true}
                autoPlay = {true}
                showThumbs = {false}
                showStatus = {false}
                transitionTime = {500}
                emulateTouch = {true}
                thumbWidth = {0}
            >
                <div>
                    <img src={Baner1} alt='banner'/>
                </div>
                <div>
                    <img src={Baner2} alt='banner' />
                </div>
                <div>
                    <img src={Baner3} alt='banner'/>
                </div>
            </Carousel>
        );
    }
};
 export default HeaderSlider;
 
