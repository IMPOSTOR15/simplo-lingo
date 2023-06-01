import React from 'react';
import cl from './ErrorIco.module.css'
const ErrorIco = () => {
    return (
        <svg id={cl.errorAnimation} className={cl.animated} xmlns="http://www.w3.org/2000/svg" width="170" height="170" viewBox="0 0 70 70">
            <path id={cl.errorAnimationResult} fill="#D8D8D8" d="M 35 60 C 21.1929 60 10 48.8071 10 35 C 10 21.1929 21.1929 10 35 10 C 48.8071 10 60 21.1929 60 35 C 60 48.8071 48.8071 60 35 60 Z M 19 23 L 31 35 L 19 47 L 23 51 L 35 39 L 47 51 L 51 47 L 39 35 L 51 23 L 47 19 L 35 31 L 23 19 Z"/>
            <circle id={cl.errorAnimationCircle} cx="35" cy="35" r="24" stroke="#979797" strokeWidth="2" strokeLinecap="round" fill="transparent"/>
            <polyline id={cl.errorAnimationCheck} stroke="#979797" strokeWidth="4" points="M 35 60 C 21.1929 60 10 48.8071 10 35 C 10 21.1929 21.1929 10 35 10 C 48.8071 10 60 21.1929 60 35 C 60 48.8071 48.8071 60 35 60 Z M 19 23 L 31 35 L 19 47 L 23 51 L 35 39 L 47 51 L 51 47 L 39 35 L 51 23 L 47 19 L 35 31 L 23 19 Z" fill="transparent"/>
        </svg>
    );
};

export default ErrorIco;