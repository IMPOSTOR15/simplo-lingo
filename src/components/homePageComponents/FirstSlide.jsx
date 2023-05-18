import React, { useEffect, useState } from 'react';
import cl from './FirstSlide.module.css'
import Typist from 'react-typist';
import Typewriter from 'typewriter-effect';
const FirstSlide = () => {

    const phrases = [
        '<h2 className={cl.subHeader}>Проходи задания</h2>',
        '<h2 className={cl.subHeader}>Отслеживай прогресс</h2>',
        '<h2 className={cl.subHeader}>Зарабатывай достижения</h2>',
        '<h2 className={cl.subHeader}>Участвуй в турнирах</h2>',
    ];

    return (
        <div className={cl.slideWrapper}>
                <ul className={cl.circles}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
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
            <button className={cl.btnHeader}>НАЧАТЬ СЕЙЧАС</button>
        </div>
    );
};

export default FirstSlide;