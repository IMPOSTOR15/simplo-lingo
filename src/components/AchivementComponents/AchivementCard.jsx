import React, { useContext, useEffect, useState } from 'react';
import cl from './AchivementCard.module.css'
import { $authHost } from '../../http';
import { Context } from '../..';
import { claimAchivement } from '../../http/achivementApi';
import { observer } from 'mobx-react-lite';
const AchivementCard = observer(({id, title, userAchivements, rare, description, points, fetchAchivementsData, img}) => {
    const {user} = useContext(Context)
    const [isClaimed, setisClaimed] = useState(false)
    const [isRedayToClaim, setIsReadyToClaim] = useState(false)
    useEffect(() => {
        userAchivements.forEach((achivement) => {
            if (achivement.achievement_id === id) {
                if (achivement.isClaimed) {
                    setisClaimed(true)
                } else {
                    setIsReadyToClaim(true)
                }
            }
        })
    })
    const tryClaimAchivement = async () => {
        console.log(user);
        await claimAchivement(user.user.id, id)
        fetchAchivementsData()
    }
    return (
        
        <div
            className={`${cl.cardWrapper} ${isClaimed ? cl.claimedCard : ""} ${isRedayToClaim ? cl.readyToClaimCard : ""}`}
        >
            <img className={cl.achivementImg} src={process.env.REACT_APP_API_URL + img} alt="" />
            <p className={cl.achivementTitle}>{title}</p>
            <p className={cl.achivementDescription}>{description}</p>
            <p className={cl.achivementRare}>{rare}</p>
            <p className={cl.achivementPoints}>{points} pts</p>
            { isClaimed &&
                <button className={cl.claimBtn}>ПОЛУЧЕНО</button>
            }
            { isRedayToClaim &&
                <button className={cl.readyToClaimBtn} onClick={() => tryClaimAchivement()}>ПОЛУЧИТЬ</button>
            }
            {!isClaimed && !isRedayToClaim &&
                <button className={cl.inncativeBtn}>ПОЛУЧИТЬ</button>
            }

            
        </div>
    );
});

export default AchivementCard;