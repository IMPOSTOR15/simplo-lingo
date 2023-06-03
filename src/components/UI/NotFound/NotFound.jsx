import React from 'react';
import cl from './NotFound.module.css'
import img404 from '../../../assets/404img.png'
import { useNavigate } from 'react-router-dom';

const NotFound = ({...props}) => {
    const navigate = useNavigate()
    return (
        <div className={cl.notFoundWrapper}>
            <img className={cl.notFoundImg} src={img404} alt="" />
            <h2 className={cl.notFoundHeader}>{props.header}</h2>
            <button className={cl.notFoundButton} onClick={() => navigate(props.route)}>{props.buttonText}</button>
        </div>
    );
};

export default NotFound;