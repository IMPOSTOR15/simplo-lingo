import React, { useContext, useEffect, useState } from 'react';
import cl from "../components/profileComponents/ProfilePage.module.css"
import { getUserData } from '../http/userAPI';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { HOME_ROUTE, QUIZE_LIST_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';
import baseprofileimg from '../assets/profileMockup.png'
import EditProfileModal from '../components/profileComponents/EditProfileModal';
import Mainbutton from '../components/UI/Buttons/Mainbutton';
import QuizListItem from '../components/quizPageComponents/QuizListItem';
import { getUserRating } from '../http/ratingApi';
import { getSolvedQuestions } from '../http/qestionApi';
import LoadingIndicator from '../components/UI/Loading/LoadingIndicator';
import RatingDonut from '../components/profileComponents/RatingDonut';

const ProfilePage = observer(() => {
    const [isLoading, setIsLoading] = useState(true)

    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})
    const [showEdit, setShowEdit] = useState(false)
    const [pieRatingValue, setPieRatingValue] = useState(0)
    const [quizArr, setQuizArr] = useState([])

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        if (!showEdit) {
            fetchData();
        }
        
    }, [showEdit, user.user.id]);
       
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('user_id')
        localStorage.removeItem('auth')
        localStorage.removeItem('token')
        navigate(HOME_ROUTE)
    }
    const showEditModal = () => {
        setShowEdit(true)
    }

    async function fetchData() {
        setIsLoading(true);
        let userid;
        if (user.user.id) {
            userid = user.user.id;
        } else {
            userid = localStorage.getItem('user_id');
        }
        console.log(userid);
        const userData = getUserData(userid);
        const userRating = getUserRating(userid);
        const solvedQuestions = getSolvedQuestions(userid);
    
        Promise.all([userData, userRating, solvedQuestions]).then(values => {
            setUserData(values[0]);
            user.setUserRating(values[1]);
            setPieRatingValue(values[1].points / 10);
            console.log(values[2].reverse());
            setQuizArr(values[2]);
            setIsLoading(false);
        }).catch(error => {
            console.error(error);
            setIsLoading(false);
        });
    }
    return (
        <div className={cl.mainWrapper}>
            {isLoading && <LoadingIndicator/> }
            <div style={isLoading ? {opacity: 0} : {}}>
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
                            </div>
                            <div className={cl.infoRow}>
                                <p className={cl.infoParagraph}>{userData.name ? userData.name : "ошибка"}</p>
                                <p className={cl.infoParagraph}>{userData.email}</p>
                                <p className={cl.infoParagraph}>{Math.floor(user.userRating.points/1000) + 1}</p>
                                <p className={cl.infoParagraph}>{user.userRating.total_solved}</p>
                            </div>
                        </div>
                        <button className={cl.editBtn} onClick={() => showEditModal()}>РЕДАКТИРОВАТЬ</button>
                        <button className={cl.editBtn} onClick={() => logOut()}>ВЫЙТИ</button>
                    </div>
                    <div className={cl.card}>
                        <h2 className={cl.cardHeader}>Рейтинг</h2>
                        <RatingDonut
                            pieRatingValue={pieRatingValue}
                            points={user.userRating.points}
                        />
                        <p className={cl.cardHeader}>До следующего уровня {1000 - user.userRating.points} pts</p>
                    </div>
                </div>
                <div className={cl.qestionBtnSection}>
                    <Mainbutton onClick={()=> navigate(QUIZE_LIST_ROUTE)} >ПЕРЕЙТИ К ВОПРОСАМ</Mainbutton>
                </div>
                <div>
                    <div className={cl.column}>
                        <h2 className={cl.cardHeader}>Последнии решенные вопросы</h2>
                        {
                            quizArr.map((quiz,index) =>
                                <QuizListItem
                                    key={quiz.id}
                                    index={index}
                                    id={quiz.id}
                                    title={quiz.title}
                                    dificulty={quiz.dificult}
                                    buttonText={'ОТКРЫТЬ'}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
            {/* } */}
        </div>
    );
});

export default ProfilePage;