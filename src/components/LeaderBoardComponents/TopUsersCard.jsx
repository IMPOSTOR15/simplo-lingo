import React, { useEffect } from 'react';
import cl from './TopUsersCard.module.css'
import avatarMockup from '../../assets/profileMockup.png'
import crown from '../../assets/crown.svg'
const TopUsersCard = ({...props}) => {
    useEffect(() => {
        console.log(props.leaderboardData);
    })
    return (
        <div className={cl.mainWrapper}>
            <div className={cl.secondRankWrapper}>
                {props?.leaderboardData[1]?.avatar ?
                    <img className={cl.secondRankAvatar} src={process.env.REACT_APP_API_URL + props?.leaderboardData[1]?.avatar} alt="" />
                    :
                    <img className={cl.secondRankAvatar} src={avatarMockup} alt="" />
                }
                {props.leaderboardData[1]?.name ?
                    <p className={cl.userName}>{props.leaderboardData[1].name}</p>
                    :
                    <p className={cl.userName}>Аноним</p>
                }
                
                <p className={cl.points}>{props?.leaderboardData[1]?.Rating.points} pts</p>
            </div>
            <div className={cl.firstRankWrapper}>
                <img className={cl.fistCup} src={crown} alt="" />
                {props?.leaderboardData[0]?.avatar ?
                    <img className={cl.firstRankAvatar} src={process.env.REACT_APP_API_URL + props?.leaderboardData[0]?.avatar} alt="" />
                    :
                    <img className={cl.firstRankAvatar} src={avatarMockup} alt="" />
                }
                {props.leaderboardData[0]?.name ?
                    <p className={cl.userName}>{props.leaderboardData[0].name}</p>
                    :
                    <p className={cl.userName}>Аноним</p>
                }
                <p className={cl.points}>{props?.leaderboardData[0]?.Rating.points} pts</p>
            </div>
            <div className={cl.thirdRankWrapper}>
                {props?.leaderboardData[2]?.avatar ?
                    <img className={cl.thirdRankAvatar} src={process.env.REACT_APP_API_URL + props?.leaderboardData[2]?.avatar} alt="" />
                    :
                    <img className={cl.thirdRankAvatar} src={avatarMockup} alt="" />
                }
                {props.leaderboardData[2]?.name ?
                    <p className={cl.userName}>{props.leaderboardData[2].name}</p>
                    :
                    <p className={cl.userName}>Аноним</p>
                }
                <p className={cl.points}>{props?.leaderboardData[2]?.Rating.points} pts</p>
            </div>
        </div>
    );
};

export default TopUsersCard;