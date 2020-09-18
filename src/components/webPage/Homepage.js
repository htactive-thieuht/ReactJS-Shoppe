import React from 'react';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import SliderMain from './SliderMain';
import Menus from './Menus';
import '../../App.css'
import { Menu } from 'antd';

function Homepage() {
    return (
        <div className="contents">
            <div className="header">
                <Header />
            </div>
            <div className="slider">
                <SliderMain />
            </div>
            <div className="slidersMenu">
                <Menus />
            </div>
            <div className="content">
                <Content />
            </div> 
            <div className="footer">
                <Footer />
            </div>
           
        </div>
    )
}
export default Homepage;

