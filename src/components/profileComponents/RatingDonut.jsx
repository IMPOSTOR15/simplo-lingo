import React from 'react';
import cl from './RatingDonut.module.css'
const RatingDonut = ({...props}) => {
    return (
        <div className={cl.circleWrapper}>
            <div className={cl.randCircle} style={{'--pie-p': `${props.pieRatingValue + '%'}`}}>
            <div className={cl.randCircleInset}></div>
            </div>
            <p className={cl.scoreStr}>{props.points} pts</p>
        </div>
    );
};

export default RatingDonut;