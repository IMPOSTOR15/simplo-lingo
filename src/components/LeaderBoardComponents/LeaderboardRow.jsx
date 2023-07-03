import React from 'react';
import cl from './LeaderboardRow.module.css'
import avatarMockup from '../../assets/profileMockup.png'
import LazyLoadImage from '../UI/LazyImage/LazyLoadImage';
const LeaderboardRow = ({...props}) => {
    return (
        <div className={`${cl.rowWrapper} ${props.index % 2 === 0 && cl.evenBg}`}>
            <p className={cl.rank}>{props.index + 4}</p>
            <div className={cl.avatarWrapper}>
                <LazyLoadImage
                    className={cl.avatar}
                    src={ props.data.avatar ? process.env.REACT_APP_API_URL + props?.data?.avatar : avatarMockup}
                />
            </div>
            
            {props.data.name ?
                <p className={cl.name}>{props?.data?.name}</p>
                :
                <p className={cl.name}>Аноним</p>
            }   
            
            <p className={cl.totalSoved}>{props?.data?.Rating?.total_solved}</p>
            <p className={cl.totalPoints}>{props?.data?.Rating?.points}</p>
        </div>
    );
};

export default LeaderboardRow;