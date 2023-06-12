import React from 'react';
import cl from './LeaderboardRow.module.css'
import avatarMockup from '../../assets/profileMockup.png'
const LeaderboardRow = ({...props}) => {
    return (
        <div className={`${cl.rowWrapper} ${props.index % 2 === 0 && cl.evenBg}`}>
            <p className={cl.rank}>{props.index + 4}</p>
            {props.data.avatar ?
                <img className={cl.avatar} src={process.env.REACT_APP_API_URL + props?.data?.avatar} alt="" />
                :
                <img className={cl.avatar} src={avatarMockup} alt="" />
            }
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