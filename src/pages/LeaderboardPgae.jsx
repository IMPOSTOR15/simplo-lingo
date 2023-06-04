import React, { useEffect, useState } from 'react';
import TopUsersCard from '../components/LeaderBoardComponents/TopUsersCard';
import { observer } from 'mobx-react-lite';
import cl from '../components/LeaderBoardComponents/LeaderboardPage.module.css'
import LeaderboardTable from '../components/LeaderBoardComponents/LeaderboardTable';
import { getLeaderboard } from '../http/ratingApi';
const LeaderboardPgae = observer(() => {
    const [leaderboardData, setleaderboardData] = useState([])
    useEffect(() => {
        getLeaderboard().then(data => setleaderboardData(data))
    }, [])
    return (
        <div className={cl.mainWrapper}>
            <h1 className={cl.leaderboardHeader}>ТАБЛИЦА ЛИДЕРОВ</h1>
            <TopUsersCard leaderboardData={leaderboardData.slice(0, 3)}/>
            <LeaderboardTable leaderboardData={leaderboardData.slice(2, -1)}/>
        </div>
    );
});

export default LeaderboardPgae;