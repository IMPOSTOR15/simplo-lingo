import React from 'react';
import cl from './LoadingIndicator.module.css'
import EnterExitWraper from '../Animation/EnterExitWrapper';
const LoadingIndicator = ({...props}) => {
    return (
        <EnterExitWraper>
        <div className={cl.loadingContainer} style={{position: `${props.position || "relative"}`, top: `${props.top}`}}>
            <svg className={cl.loader} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340">
                <circle cx="170" cy="170" r="160" stroke="#ff6423"/>
                <circle cx="170" cy="170" r="135" stroke="#894fb0"/>
                <circle cx="170" cy="170" r="110" stroke="#ff6423"/>
                <circle cx="170" cy="170" r="85" stroke="#894fb0"/>
            </svg>
        </div>
        </EnterExitWraper>
    );
};

export default LoadingIndicator;