import React, { useContext } from 'react';
import AnimatedBG from '../components/UI/AnimatedBackground/AnimatedBG';
import cl from '../components/AboutPageComponents/AboutPage.module.css'
import EnterExitWraper from '../components/UI/Animation/EnterExitWrapper';
import FeatureSlider from '../components/AboutPageComponents//FeatureSlider/FeatureSlider'
import ColapseBar from '../components/AboutPageComponents/ColapseBlock/ColapseBar';
import Mainbutton from '../components/UI/Buttons/Mainbutton';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { PROFILE_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';
import AboutFooter from '../components/AboutPageComponents/AboutFooter';

const AboutPage = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    return (
        <EnterExitWraper>
            <div className={cl.mainWrapper}>
                <div className={cl.dynamicBackground}>
                    <AnimatedBG/>
                </div>
                <h1 className={cl.mainHeader}>SimploLingo</h1>
                <FeatureSlider/>
                <ColapseBar/>
                <div className={cl.devider}/>
                <p className={cl.registrationText}>Зарегистрируйтесь в SimploLingo прямо сейчас и отправляйтесь в путешествие по изучению языка, которое увлекательно и эффективно. Присоединяйтесь к нашему дружелюбному сообществу учеников английского и почувствуйте силу интерактивных тестов, отслеживания прогресса, рейтингов и достижений. Начните свой путь к свободному владению английским языком прямо сейчас!</p>
                <div className={cl.footerButton}>
                    <Mainbutton onClick={user.isAuth ? () => navigate(PROFILE_ROUTE) : () => navigate(REGISTRATION_ROUTE)} style={{width: "300px"}}>{user.isAuth ? "В ПРОФИЛЬ" : "РЕГИСТРАЦИЯ"}</Mainbutton>
                </div>
                <AboutFooter/>
            </div>
        </EnterExitWraper>
    );
});

export default AboutPage;