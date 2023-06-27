import React, { useContext, useEffect, useState } from 'react';
import cl from "../components/profileComponents/ProfilePage.module.css"
import { getUserData } from '../http/userAPI';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { ACHIVEMENTS_ROUTE, HOME_ROUTE, QUIZE_LIST_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';
import baseprofileimg from '../assets/profileMockup.png'
import EditProfileModal from '../components/profileComponents/EditProfileModal';
import Mainbutton from '../components/UI/Buttons/Mainbutton';
import QuizListItem from '../components/quizPageComponents/QuizListItem';
import { getUserRating } from '../http/ratingApi';
import { getSolvedQuestions } from '../http/qestionApi';
import LoadingIndicator from '../components/UI/Loading/LoadingIndicator';
import RatingDonut from '../components/profileComponents/RatingDonut';
import { CSSTransition } from 'react-transition-group';
import EnterExitWraper from '../components/UI/Animation/EnterExitWrapper';
import Calendar from '../components/profileComponents/Calendar/Calendar'

import awardIco from '../assets/award-ico.png'
import editIco from '../assets/edit-ico.png'
import logoutIco from '../assets/logout-ico.png'
const ProfilePage = observer(() => {
    const [isLoading, setIsLoading] = useState(true)
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [showEdit, setShowEdit] = useState(false)
    const [pieRatingValue, setPieRatingValue] = useState(0)
    const [quizArr, setQuizArr] = useState([])

    useEffect(() => {
        if (!showEdit) {
            fetchData();
        }
    }, [showEdit]);
       
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
        
        let userid;
        if (user.user.id) {
            userid = user.user.id;
        } else {
            userid = localStorage.getItem('user_id');
        }
        const userData = getUserData(userid);
        const userRating = getUserRating(userid);
        const solvedQuestions = getSolvedQuestions(userid);
    
        Promise.all([userData, userRating, solvedQuestions]).then(values => {
            user.setUser(values[0])
            user.setUserRating(values[1]);
            setPieRatingValue((values[1].points % 1000) / 10);
            setQuizArr(values[2]);
            setIsLoading(false);
            console.log(user.user.avatar);
        }).catch(error => {
            console.error(error);
            setIsLoading(false);
        });
    }
    if(isLoading) {
        return <LoadingIndicator/>
    }
    return (
        <EnterExitWraper>
        <div className={cl.mainWrapper}>
            <div style={isLoading ? {opacity: 0} : {}}>
                <CSSTransition
                    in={showEdit}
                    classNames='fade'
                    timeout={300}
                    unmountOnExit
                >
                    <EditProfileModal show={showEdit} setShow={setShowEdit}/>
                </CSSTransition>
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
                                <p className={cl.infoParagraph}>{user.user.name ? user.user.name : "ошибка"}</p>
                                <p className={cl.infoParagraph}>{user.user.email}</p>
                                <p className={cl.infoParagraph}>{Math.floor(user.userRating.points/1000) + 1}</p>
                                <p className={cl.infoParagraph}>{user.userRating.total_solved}</p>
                            </div>
                            
                        </div>
                        <div className={cl.buttonRow}>
                            <button className={cl.editBtn} onClick={() => navigate(ACHIVEMENTS_ROUTE)}>
                                <img className={cl.buttonIco} src={awardIco} alt="" />
                            </button>
                            <button className={cl.editBtn} onClick={() => showEditModal()}>
                                <img className={cl.buttonIco} src={editIco} alt="" />
                            </button>
                            <button className={cl.editBtn} onClick={() => logOut()}>
                            <img className={cl.buttonIco} src={logoutIco} alt="" />
                            </button>
                        </div>
                    </div>
                    <div className={cl.card}>
                        <h2 className={cl.cardHeader}>Рейтинг</h2>
                        <RatingDonut
                            pieRatingValue={pieRatingValue}
                            points={user.userRating.points}
                        />
                        <p className={cl.cardHeader}>До следующего уровня {1000 - user.userRating.points % 1000} pts</p>
                    </div>
                    <div className={cl.card}>
                        <h2 className={cl.cardHeader}>Журнал активности</h2>
                        <Calendar checkedDates={[1,2,3,4]}/>
                    </div>
                    <div className={cl.card}>
                        <h2 className={cl.cardHeader}>Турниры</h2>
                        <div className={cl.infoCard}>
                            <div className={cl.infoColumn}>
                                <p className={cl.infoParagraph}>Выиграно:</p>
                                <p className={cl.infoParagraph}>Лучший результат:</p>
                                <p className={cl.infoParagraph}>Последний результат:</p>
                                {/* <p className={cl.infoParagraph}>Решено вопросов:</p> */}
                            </div>
                            <div className={cl.infoRow}>
                                <p className={cl.infoParagraph}>0</p>
                                <p className={cl.infoParagraph}>0</p>
                                <p className={cl.infoParagraph}>0</p>
                                {/* <p className={cl.infoParagraph}>{user.userRating.total_solved}</p> */}
                            </div>
                            
                        </div>
                        <Mainbutton onClick={()=> navigate()} >ПРИНЯТЬ УЧАСТИЕ</Mainbutton>
                        <div className={cl.soon}>
                            <p className={cl.soonText}>СКОРО</p>
                        </div>
                    </div>
                </div>
                <div className={cl.qestionBtnSection}>
                    <Mainbutton onClick={()=> navigate(QUIZE_LIST_ROUTE)} >ПЕРЕЙТИ К ВОПРОСАМ</Mainbutton>
                </div>
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
        </EnterExitWraper>
    );
});

export default ProfilePage;