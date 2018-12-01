import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import '../Homepage.css';
import './HomepageSlider.css';


class HeaderSlider extends Component {
    render() {
        return (
            <section className="slider">
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
                        <img src='https://firebasestorage.googleapis.com/v0/b/menu-app-d88b1.appspot.com/o/sliderImages%2Fbaner2.jpg?alt=media&token=bb832b1e-7cf0-4c1d-bb97-58fabd7ce3a6' alt='banner'/>
                    </div>
                    <div>
                        <img src='https://firebasestorage.googleapis.com/v0/b/menu-app-d88b1.appspot.com/o/sliderImages%2Fbaner1.jpg?alt=media&token=fac40d3f-d842-40e2-925f-61289f99cc1e' alt='banner' />
                    </div>
                    <div>
                        <img src='https://firebasestorage.googleapis.com/v0/b/menu-app-d88b1.appspot.com/o/sliderImages%2Fbaner3.jpg?alt=media&token=2fbe95dc-36fe-453a-825f-14ee8e78d4a3' alt='banner'/>
                    </div>
                </Carousel>
            </section>
        );
    }
};
 export default HeaderSlider;
 
