import React, { useEffect, useState } from 'react';
import TopUsersCard from '../components/LeaderBoardComponents/TopUsersCard';
import { observer } from 'mobx-react-lite';
import cl from '../components/LeaderBoardComponents/LeaderboardPage.module.css'
import LeaderboardTable from '../components/LeaderBoardComponents/LeaderboardTable';
import { getLeaderboard } from '../http/ratingApi';
import LoadingIndicator from '../components/UI/Loading/LoadingIndicator';
import EnterExitWraper from '../components/UI/Animation/EnterExitWrapper';
const LeaderboardPgae = observer(() => {
    const [isLoading, setIsLoading] = useState(true)
    const [leaderboardData, setleaderboardData] = useState([])
    useEffect(() => {
        setIsLoading(true)
        getLeaderboard().then(data => {
            setleaderboardData(data)
            setIsLoading(false)
        })
    }, [])
    return (
        <EnterExitWraper>
        <div>
            {isLoading && <LoadingIndicator/> }
            <div className={cl.mainWrapper} style={isLoading ? {opacity: 0} : {}}>
                <h1 className={cl.leaderboardHeader}>ТАБЛИЦА ЛИДЕРОВ</h1>
                <TopUsersCard leaderboardData={leaderboardData.slice(0, 3)}/>
                <LeaderboardTable leaderboardData={leaderboardData.slice(2, -1)}/>
            </div>
        </div>
        </EnterExitWraper>
    );
});

export default LeaderboardPgae;