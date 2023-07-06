import React from 'react';
import FirstSlide from '../components/homePageComponents/FirstSlide';
import EnterExitWraper from '../components/UI/Animation/EnterExitWrapper';
import AboutFooter from '../components/AboutPageComponents/AboutFooter';

const HomePage = () => {
    return (
        <EnterExitWraper>
        <div>
            <FirstSlide/>
            <AboutFooter/>
        </div>
        </EnterExitWraper>
    );
};

export default HomePage;