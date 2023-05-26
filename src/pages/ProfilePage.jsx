import React, { useContext, useEffect, useState } from 'react';
import cl from "../components/profileComponents/ProfilePage.module.css"
import { getUserData } from '../http/userAPI';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { HOME_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';


const ProfilePage = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const [userData, setUserData] = useState({})

    useEffect(() => {
        async function fetchData() {
            // setUserData(await getUserData(localStorage.getItem('user_id')))
            console.log(user.user.id);
            setUserData(await getUserData(user.user.id))
        }
        fetchData();
    }, []);

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        navigate(HOME_ROUTE)
    }
    
    return (
        <div className={cl.mainWrapper}>
            <div className={cl.row}>
                <div className={cl.logoCard}>
                    <img className={cl.logoImg} src="https://avatars.githubusercontent.com/u/62654099?v=4" alt="" />
                </div>
                <div className={cl.card}>   
                    <h2 className={cl.cardHeader}>Информация о профиле</h2>
                    <div className={cl.infoCard}>
                        <div className={cl.infoColumn}>
                            <p className={cl.infoParagraph}>Имя:</p>
                            <p className={cl.infoParagraph}>e-mail:</p>
                            <p className={cl.infoParagraph}>Уровень:</p>
                            <p className={cl.infoParagraph}>Решено вопросов:</p>
                            <p className={cl.infoParagraph}>Дней подряд:</p>
                        </div>
                        <div className={cl.infoRow}>
                            <p className={cl.infoParagraph}>{userData.name ? userData.name : "ошибка"}</p>
                            <p className={cl.infoParagraph}>{userData.email}</p>
                            <p className={cl.infoParagraph}>5</p>
                            <p className={cl.infoParagraph}>120</p>
                            <p className={cl.infoParagraph}>13</p>
                        </div>
                    </div>
                    <button className={cl.editBtn}>РЕДАКТИРОВАТЬ</button>
                    <button className={cl.editBtn} onClick={() => logOut()}>ВЫЙТИ</button>
                </div>
                <div className={cl.card}>   
                    <h2 className={cl.cardHeader}>Рейтинг</h2>
                    <div className={cl.randCircle}>
                        
                    </div>
                    <p className={cl.scoreStr}>100pts</p>
                </div>
                
            </div>
            <div>
                <div className={cl.column}>
                    <h2 className={cl.cardHeader}>Последнии решенные вопросы</h2>
                    <div className={cl.lastQestions}>
                        <div className={cl.qestionCard}>1. Who will win?</div>
                        <div className={cl.qestionCard}>2. Who will lose?</div>
                        <div className={cl.qestionCard}>3. Who will draw?</div>
                        <div className={cl.qestionCard}>1. Who will win?</div>
                        <div className={cl.qestionCard}>2. Who will lose?</div>
                        <div className={cl.qestionCard}>3. Who will draw?</div>
                        <div className={cl.qestionCard}>1. Who will win?</div>
                        <div className={cl.qestionCard}>2. Who will lose?</div>
                        <div className={cl.qestionCard}>3. Who will draw?</div>
                        <div className={cl.qestionCard}>1. Who will win?</div>
                        <div className={cl.qestionCard}>2. Who will lose?</div>
                        <div className={cl.qestionCard}>3. Who will draw?</div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ProfilePage;