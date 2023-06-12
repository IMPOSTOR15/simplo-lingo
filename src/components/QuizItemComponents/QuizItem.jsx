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
import LoadingIndicator from '../UI/Loading/LoadingIndicator';
import EnterExitWraper from '../UI/Animation/EnterExitWrapper';
const QuizItem = observer(() => {
    const [isLoading, setIsLoading] = useState(true)
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
        setIsLoading(true)
        let user_id = user.user.id ? user.user.id : localStorage.getItem('user_id')

        getQestionsById(id).then(data => setQuizData(data))
        getQestionAnswers(id).then(data => setAnswers(data))

        solvedCheck(user_id, id).then(data => {
            setIsSolved(data.isSolved)
            setIsLoading(false)
        })
    }, [id, showModal, user.user.id])

    const giveAnswer = () => {
        if (pikedAnswer.id) {
            setIsLoading(true)
            giveCorrectAnswer(quizData.id, pikedAnswer.id, user.user.id).then(data => {
                    setIsCorrectAnswer(data.isCorrect)
                    setShowModal(true)
                }
            )
        }
    }

    return (
        <EnterExitWraper>
        <div>
            <QuizAnswerModal id={id} show={showModal} setShow={setShowModal} isCorrect={isCorrectAnswer}/>
            {isLoading && <LoadingIndicator/>}
            {
                quizData ? 
                    ( isSolved ?
                        <div className={cl.mainWrapper} style={isLoading ? {opacity: 0} : {}}>
                            
                            <div className={cl.quizNavigationWrapeer}>
                                <button className={cl.quizNavButton} onClick={() => navigate(QUIZE_ITEM_ROUTE + `/${parseInt(id) - 1}`)}>&#129092; Предыдущий</button>
                                <button className={cl.quizNavButton} onClick={() => navigate(QUIZE_LIST_ROUTE)}>&#128221; Список</button>
                                <button className={cl.quizNavButton} onClick={() => navigate(QUIZE_ITEM_ROUTE + `/${parseInt(id) + 1}`)}>Следующий &#129094;</button>
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
                        <div className={cl.mainWrapper} style={isLoading ? {opacity: 0} : {}}>
                            <div className={cl.quizNavigationWrapeer}>
                                <button className={cl.quizNavButton} onClick={() => navigate(QUIZE_ITEM_ROUTE + `/${parseInt(id) - 1}`)}>&#129092; Предыдущий</button>
                                <button className={cl.quizNavButton} onClick={() => navigate(QUIZE_LIST_ROUTE)}>&#128221; Список</button>
                                <button className={cl.quizNavButton} onClick={() => navigate(QUIZE_ITEM_ROUTE + `/${parseInt(id) + 1}`)}>Следующий &#129094;</button>
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
        </EnterExitWraper>
    );
});

export default QuizItem;