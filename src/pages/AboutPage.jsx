import React from 'react';
import AnimatedBG from '../components/UI/AnimatedBackground/AnimatedBG';
import cl from '../components/AboutPageComponents/AboutPage.module.css'
import EnterExitWraper from '../components/UI/Animation/EnterExitWrapper';
import FeatureSlider from '../components/AboutPageComponents/FeatureSlider'
const AboutPage = () => {
    return (
        <EnterExitWraper>
            <div className={cl.mainWrapper}>
                <div style={{position:"fixed", width:"100vw", height: "100vh", marginTop: "30vh"}}>
                    <AnimatedBG/>
                </div>
                <h1 className={cl.mainHeader}>SimploLingo</h1>
                <FeatureSlider/>
            </div>
        </EnterExitWraper>
    );
};

export default AboutPage;