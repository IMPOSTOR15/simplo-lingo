import React from 'react';
import FirstSlide from '../components/homePageComponents/FirstSlide';
import EnterExitWraper from '../components/UI/Animation/EnterExitWrapper';

const HomePage = () => {
    return (
        <EnterExitWraper>
        <div>
            <FirstSlide/>
        </div>
        </EnterExitWraper>
    );
};

export default HomePage;