import cl from './LeaderbordTable.module.css'
import LeaderboardRow from './LeaderboardRow';
const LeaderboardTable = ({...props}) => {
    return (
        <div className={cl.mainWrapper}>
            <div className={cl.infoRow}>
                <p className={cl.placeText}>Место</p>
                <p className={cl.userText}>Пользователь</p>
                <p className={cl.taskText}>решено задач</p>
                <p className={cl.pointsText}>Очков</p>
            </div>
            { props.leaderboardData.map(userRaringData => 
                <LeaderboardRow
                    key={props?.leaderboardData.indexOf(userRaringData)}
                    data={userRaringData}
                    index={props?.leaderboardData.indexOf(userRaringData)}
                />
            )

            }
        </div>
    );
};

export default LeaderboardTable;