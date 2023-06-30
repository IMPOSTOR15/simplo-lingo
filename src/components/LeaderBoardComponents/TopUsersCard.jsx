import React, { useEffect } from 'react';
import cl from './TopUsersCard.module.css'
import avatarMockup from '../../assets/profileMockup.png'
import crown from '../../assets/crown.svg'
import LazyLoadImage from '../UI/LazyImage/LazyLoadImage';
const TopUsersCard = ({...props}) => {
    useEffect(() => {
        console.log(props.leaderboardData);
    })
    return (
        <div className={cl.mainWrapper}>
            <div className={cl.secondRankWrapper}>
                <LazyLoadImage
                    className={cl.secondRankAvatar}
                    src={ props?.leaderboardData[1]?.avatar ? process.env.REACT_APP_API_URL + props?.leaderboardData[1]?.avatar : avatarMockup}
                />
                <p className={cl.userName}>{props.leaderboardData[1]?.name ? props.leaderboardData[1].name : "Аноним"}</p>
                <p className={cl.points}>{props?.leaderboardData[1]?.Rating.points} pts</p>
            </div>
            <div className={cl.firstRankWrapper}>
                <img className={cl.fistCup} src={crown} alt="" />
                <LazyLoadImage
                    className={cl.firstRankAvatar}
                    src={ props?.leaderboardData[0]?.avatar ? process.env.REACT_APP_API_URL + props?.leaderboardData[0]?.avatar : avatarMockup}
                />
                <p className={cl.userName}>{props.leaderboardData[0]?.name ? props.leaderboardData[0].name : "Аноним"}</p>
                <p className={cl.points}>{props?.leaderboardData[0]?.Rating.points} pts</p>
            </div>
            <div className={cl.thirdRankWrapper}>
                <LazyLoadImage
                    className={cl.thirdRankAvatar}
                    src={ props?.leaderboardData[2]?.avatar ? process.env.REACT_APP_API_URL + props?.leaderboardData[2]?.avatar : avatarMockup}
                />
                <p className={cl.userName}>{props.leaderboardData[2]?.name ? props.leaderboardData[2].name : "Аноним"}</p>
                <p className={cl.points}>{props?.leaderboardData[2]?.Rating.points} pts</p>
            </div>
        </div>
    );
};

export default TopUsersCard;