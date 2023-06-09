import React, { useEffect, useState } from 'react';
import cl from './AchivementBoard.module.css'
import { getAllAchivements } from '../../http/achivementApi';
import LoadingIndicator from '../UI/Loading/LoadingIndicator';
import AchivementCard from './AchivementCard';
const AchivementBoard = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [achivements, setAchivements] = useState({})
    useEffect(() => {
        getAllAchivements().then((data) => {
            setAchivements(data)
            console.log(achivements);
            setIsLoading(false)
        }).then()
    }, [])
    return (
        <div className={cl.mainWrapper}>
            <h1 className={cl.header}>Достижения</h1>
            <div className={cl.achivementsWrapper}>
                {isLoading ?
                    <LoadingIndicator/>
                    :
                    achivements.map(achivement => 
                        <AchivementCard key={achivement.id} title={achivement.name} rare={achivement.rare} img={achivement.photo}/>
                        )
                }
            </div>
        </div>
    );
};

export default AchivementBoard;