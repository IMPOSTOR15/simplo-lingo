import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cl from './QuizItem.module.css'
import { getQestionsById, solvedCheck } from '../../http/qestionApi';
import { getQestionAnswers } from '../../http/answersApi';
import QuizAnswerModal from './QuizAnswerModal';
import { giveCorrectAnswer } from '../../http/ratingApi';
import { Context } from '../..';

import { QUIZE_ITEM_ROUTE, QUIZE_LIST_ROUTE } from '../../utils/consts';
import NotFound from '../UI/NotFound/NotFound';
import { observer } from 'mobx-react-lite';
const QuizItem = observer(() => {
    const {id} = useParams()
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false)
    const [quizData, setQuizData] = useState({})
    const [isSolved, setIsSolved] = useState(false)
    const [answers, setAnswers] = useState([])
    const [pikedAnswer, setPikedAnswer] = useState({})
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)
    
    useEffect(() => {
        let user_id = user.user.id ? user.user.id : localStorage.getItem('user_id')
        console.log(user_id);
        getQestionsById(id).then(data => setQuizData(data))
        getQestionAnswers(id).then(data => setAnswers(data))
        console.log(user_id);
        solvedCheck(user_id, id).then(data => {
            setIsSolved(data.isSolved)
            console.log(data);
            console.log(quizData);
        })
    }, [id])

    const giveAnswer = () => {
        if (quizData.correct_answer_id === pikedAnswer.id) {
            setIsCorrectAnswer(true)
            giveCorrectAnswer(quizData.id, pikedAnswer.id, user.user.id).then(data => console.log(data))
        } else {
            setIsCorrectAnswer(false)
        }
        setShowModal(true)
    }

    return (
        <div>
            {
                quizData ? 
                    ( isSolved ?
                        <div className={cl.mainWrapper}>
                            <QuizAnswerModal show={showModal} setShow={setShowModal} isCorrect={isCorrectAnswer}/>
                            <div className={cl.quizNavigationWrapeer}>
                                <button className={cl.quizNavButton} onClick={() => navigate(QUIZE_ITEM_ROUTE + `/${parseInt(id) - 1}`)}>Предыдущий</button>
                                <button className={cl.quizNavButton} onClick={() => navigate(QUIZE_LIST_ROUTE)}>Список</button>
                                <button className={cl.quizNavButton} onClick={() => navigate(QUIZE_ITEM_ROUTE + `/${parseInt(id) + 1}`)}>Следующий</button>
                            </div>
                            <div className={cl.quizCard}>
                                <h2 className={cl.quizTitle}>{quizData.id}. {quizData.title}</h2>
                                <p className={cl.quizDescription}>{quizData.text}</p>
                            </div>
                            <div className={cl.devider}></div>
                            <div className={cl.answerBar}>
                                {answers.map((answer, index) =>
                                    <div
                                        key={index}
                                        className={`${cl.answerWrapper} ${answers[index]?.is_correct ? cl.correctAnswer : ""}`}
                                        onClick={()=> setPikedAnswer(answers[index])}
                                    >
                                        {answer.answer}
                                    </div>
                                )}
                            </div>
                            <button className={`${cl.AnswerBtn} ${cl.AnswerBtnInactive}`}>ОТВЕТИТЬ</button>
                        </div>
                        
                    :
                        <div className={cl.mainWrapper}>
                            <QuizAnswerModal show={showModal} setShow={setShowModal} isCorrect={isCorrectAnswer}/>
                            <div className={cl.quizNavigationWrapeer}>
                                <button className={cl.quizNavButton} onClick={() => navigate(QUIZE_ITEM_ROUTE + `/${parseInt(id) - 1}`)}>Предыдущий</button>
                                <button className={cl.quizNavButton} onClick={() => navigate(QUIZE_LIST_ROUTE)}>Список</button>
                                <button className={cl.quizNavButton} onClick={() => navigate(QUIZE_ITEM_ROUTE + `/${parseInt(id) + 1}`)}>Следующий</button>
                            </div>
                            <div className={cl.quizCard}>
                                <h2 className={cl.quizTitle}>{quizData.id}. {quizData.title}</h2>
                                <p className={cl.quizDescription}>{quizData.text}</p>
                            </div>
                            <div className={cl.devider}></div>
                            <div className={cl.answerBar}>
                                {answers.map((answer, index) =>
                                    <div
                                        key={index}
                                        className={`${cl.answerWrapper} ${answers[index]?.id === pikedAnswer?.id ? cl.answerWrapperActive : ""}`}
                                        onClick={()=> setPikedAnswer(answers[index])}
                                    >
                                        {answer.answer}
                                    </div>
                                )}
                            </div>
                            <button className={cl.AnswerBtn} onClick={giveAnswer}>ОТВЕТИТЬ</button>
                        </div>
                    )
                :
                    <NotFound
                        header={'Страница не найдена, похоже ты решил все вопросы!'}
                        buttonText={'ВЕРНУТЬСЯ К ВОПРОСАМ'}
                        route={QUIZE_LIST_ROUTE}
                    />
            }
            
        </div>
    );
});

export default QuizItem;