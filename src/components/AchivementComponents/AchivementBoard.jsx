import React, { useContext, useEffect, useState } from 'react';
import cl from './AchivementBoard.module.css'
import { getAllAchivements, getUserAchivements } from '../../http/achivementApi';
import LoadingIndicator from '../UI/Loading/LoadingIndicator';
import AchivementCard from './AchivementCard';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
const AchivementBoard = observer(() => {
    const [isLoading, setIsLoading] = useState(true)
    const [achivements, setAchivements] = useState({})
    const [userAchivements, setUserAchivements] = useState({})
    const {user} = useContext(Context)

    useEffect(() => {
        fetchAchivementsData()
    }, [])

    const fetchAchivementsData = () => {
        setIsLoading(true);
        console.log('fetching achivements')
        let userId = user.user.id
        const fetchUserAchivements = getUserAchivements(userId);
        const fetchAllAchivements = getAllAchivements(userId);
        Promise.all([fetchUserAchivements, fetchAllAchivements]).then(values => {
            setUserAchivements(values[0]);
            setAchivements(values[1]);
            setIsLoading(false);
        }).catch(error => {
            console.error(error);
            setIsLoading(false);
        });
    }

    return (
        <div className={cl.mainWrapper}>
            <h1 className={cl.header}>Достижения</h1>
            <div className={cl.achivementsWrapper}>
                {isLoading ?
                    <LoadingIndicator/>
                    :
                    achivements.map(achivement =>
                        <AchivementCard
                            key={achivement.id}
                            id={achivement.id}
                            userAchivements={userAchivements}
                            title={achivement.name}
                            rare={achivement.rare}
                            img={achivement.photo}
                            fetchAchivementsData={fetchAchivementsData}
                        />  
                        )
                }
            </div>
        </div>
    );
});

export default AchivementBoard;