import React, { useContext, useEffect, useState } from 'react';
import cl from "../components/profileComponents/ProfilePage.module.css"
import { getUserData } from '../http/userAPI';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { HOME_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';
import baseprofileimg from '../assets/profileMockup.png'
import EditProfileModal from '../components/profileComponents/EditProfileModal';
import Mainbutton from '../components/UI/Buttons/Mainbutton';

const ProfilePage = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})
    const [showEdit, setShowEdit] = useState(false)

    useEffect(() => {
        async function fetchData() {
            let userid
            if (user.user.id) {
                userid = user.user.id
            } else {
                userid = localStorage.getItem('user_id')
            }
            console.log(userid);
            setUserData(await getUserData(userid))
        }
        fetchData();
    }, [showEdit, user.user.id]);

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        navigate(HOME_ROUTE)
    }
    const showEditModal = () => {
        setShowEdit(true)
    }
    
    return (
        
        <div className={cl.mainWrapper}>
            {/* {showEdit && } */}
            <EditProfileModal show={showEdit} setShow={setShowEdit}/>
            <div className={cl.row}>
                <div className={cl.logoCard}>
                    {user.user.avatar ? 
                        <img className={cl.logoImg} src={process.env.REACT_APP_API_URL + user.user.avatar} alt="" />
                    :
                        <img className={cl.logoImg} src={baseprofileimg} alt="" />
                    }
                    
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
                    <button className={cl.editBtn} onClick={() => showEditModal()}>РЕДАКТИРОВАТЬ</button>
                    <button className={cl.editBtn} onClick={() => logOut()}>ВЫЙТИ</button>
                </div>
                <div className={cl.card}>   
                    <h2 className={cl.cardHeader}>Рейтинг</h2>
                    <div className={cl.circleWrapper}>
                        <div className={cl.randCircle}>
                            
                        </div>
                        <p className={cl.scoreStr}>100pts</p>
                    </div>
                    
                </div>
                
            </div>
            <div className={cl.qestionBtnSection}>
                <Mainbutton>ПЕРЕЙТИ К ВОПРОСАМ</Mainbutton>
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