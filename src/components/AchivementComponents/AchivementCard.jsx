import React from 'react';
import cl from './AchivementCard.module.css'
import { $authHost } from '../../http';
const AchivementCard = ({title, rare, img}) => {
    return (
        <div className={cl.cardWrapper}>
            <img className={cl.achivementImg} src={process.env.REACT_APP_API_URL + img} alt="" />
            <p className={cl.achivementTitle}>{title}</p>
            <p className={cl.achivementRare}>{rare}</p>

            <button className={cl.claimBtn}>ПОЛУЧИТЬ</button>
        </div>
    );
};

export default AchivementCard;