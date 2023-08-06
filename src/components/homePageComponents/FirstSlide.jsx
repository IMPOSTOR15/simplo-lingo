import React, { useContext } from 'react';
import cl from './FirstSlide.module.css'
import Typewriter from 'typewriter-effect';
import Mainbutton from '../UI/Buttons/Mainbutton';
import AnimatedBG from '../UI/AnimatedBackground/AnimatedBG';
import { useNavigate } from 'react-router-dom';
import { Context } from '../..';
import { PROFILE_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';
const FirstSlide = () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const phrases = [
        '<h2 className={cl.subHeader}>Проходи задания</h2>',
        '<h2 className={cl.subHeader}>Отслеживай прогресс</h2>',
        '<h2 className={cl.subHeader}>Зарабатывай достижения</h2>',
        '<h2 className={cl.subHeader}>Участвуй в турнирах</h2>',
    ];
    const goToApp = () => {
        if (user.isAuth) {
            navigate(PROFILE_ROUTE)
        } else {
            navigate(REGISTRATION_ROUTE)
        }
    }
    return (
        <div className={cl.slideWrapper}>
            <AnimatedBG/>
            <h1 className={cl.mainHeader}>Ежедневно улучшай свои навыки языка</h1>
            <div className={cl.typewriterText}>
                <div className='cl.subHeader' style={{color: 'transparent', height: '100px'}}></div>
                <Typewriter
                    options={{
                        strings: phrases,
                        autoStart: true,
                        loop: true,
                        delay: 50,
                        deleteSpeed: 50,
                        pauseFor: 3000,
                        skipAddStyles: true,
                        cursorClassName: `${cl.Typewriter__cursor}`,
                        wrapperClassName: `${cl.subHeader}`,
                        cursor: "|"
                    }}
                />
            </div>
            <Mainbutton onClick={() => {goToApp()}}>НАЧАТЬ СЕЙЧАС</Mainbutton>
        </div>
    );
};

export default FirstSlide;