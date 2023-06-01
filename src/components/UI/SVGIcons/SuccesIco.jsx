import React from 'react';
import cl from './SuccesIco.module.css'
const SuccesIco = () => {
    return (
        <svg id={cl.successAnimation} className={cl.animated} xmlns="http://www.w3.org/2000/svg" width="170" height="170" viewBox="0 0 70 70">
            <path id={cl.successAnimationResult} fill="#D8D8D8" d="M 35 60 C 21.1929 60 10 48.8071 10 35 C 10 21.1929 21.1929 10 35 10 C 48.8071 10 60 21.1929 60 35 C 60 48.8071 48.8071 60 35 60 Z M 23.197 31.683 L 20.586 34.892 L 34.022 46.859 L 49.851 28.147 L 46.641 25.373 L 33.423 40.984 L 23.197 31.683 Z"/>
            <circle id={cl.successAnimationCircle} cx="35" cy="35" r="24" stroke="#979797" strokeWidth="2" strokeLinecap="round" fill="transparent"/>
            <polyline id={cl.successAnimationCheck} stroke="#979797" strokeWidth="4" points="23 34 34 43 47 27" fill="transparent"/>
        </svg>
    );
};

export default SuccesIco;