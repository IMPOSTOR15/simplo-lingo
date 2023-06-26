import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cl from './QuizItem.module.css'
import { getQestionsById, solvedCheck } from '../../http/qestionApi';
import { getCorrectAnswers, getQestionAnswers } from '../../http/answersApi';
import QuizAnswerModal from './QuizAnswerModal';
import { giveCorrectDragAnswer, giveCorrectFormAnswer } from '../../http/ratingApi';
import { Context } from '../..';

import { QUIZE_ITEM_ROUTE, QUIZE_LIST_ROUTE } from '../../utils/consts';
import NotFound from '../UI/NotFound/NotFound';
import { observer } from 'mobx-react-lite';
import LoadingIndicator from '../UI/Loading/LoadingIndicator';
import EnterExitWraper from '../UI/Animation/EnterExitWrapper';
import DNDArea from '../UI/DragableComponents/DNDArea';

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

    const [questionFlow, setQuestionFlow] = useState([])
    const [currentAnswers, setCurrentAnswers] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);

    const [correctAnswers, setCorrectAnswer] = useState([]);

    useEffect(() => {
        setIsLoading(true)
        let user_id = user.user.id ? user.user.id : localStorage.getItem('user_id')

        getQestionsById(id).then(data => {
            setQuizData(data)
            if (data) {
                setQuestionFlow(data.text.split("*"));
            }
            
        }).then()

        solvedCheck(user_id, id).then(data => {
            setIsSolved(data.isSolved)
            if (data.isSolved) {
                getCorrectAnswers(id, user_id).then(data => {
                    if (data.type === "drag") {
                        let answersTextArr = data.answers[0].answer.split(', ')
                        answersTextArr = answersTextArr.map((elem, index) => {
                            return {
                                id: index,
                                text: elem,
                            }
                        })
                        setCorrectAnswer(answersTextArr)
                    }
                    if (data.type === "form") {
                        setCorrectAnswer(data.answers)
                    } else {
                        console.log("incorect type");
                        return
                    }
                })
            }
            setIsLoading(false)
        })
    }, [id, showModal, user.user.id])

    useEffect(() => {
        if (quizData) {
            getQestionAnswers(id).then(data => {
                if (data.type === "drag") {
                    let answersTextArr = data.answers[0].answer.split(', ')
                    answersTextArr = answersTextArr.map((elem, index) => {
                        return {
                            id: index,
                            text: elem,
                            isAlreadyUsed: false
                        }
                    })
                    
                    setCurrentAnswers(answersTextArr);
                }
                if (data.type === "form") {
                    setAnswers(data.answers)
                } else {
                    console.log("incorect type");
                    return
                }
                
            })
        }
    }, [id, quizData])

    const giveAnswer = () => {
        if (quizData.type === "form" && pikedAnswer.id) {
            setIsLoading(true)
            giveCorrectFormAnswer(quizData.id, pikedAnswer.id, user.user.id).then(
                data => {
                    setIsCorrectAnswer(data.isCorrect)
                    setShowModal(true)
                }
            )
        }
        if (quizData.type === "drag" && !userAnswers.includes(undefined) && userAnswers.length === quizData.text.split("*").length - 1) {
            setIsLoading(true)
            giveCorrectDragAnswer(quizData.id, userAnswers, user.user.id).then(
                data => {
                    setIsCorrectAnswer(data.isCorrect)
                    setShowModal(true)
                }
            )
        }
    }
    
    const handleDrop = (block_id, areaId) => {
        let newCurrentAnswers = [...currentAnswers];
        let newUserAnswers = [...userAnswers];
    
        if(newUserAnswers[areaId]) {
            const replacedBlockIndex = newCurrentAnswers.findIndex(answer => answer.id === newUserAnswers[areaId].id);
            if(replacedBlockIndex !== -1) {
                newCurrentAnswers[replacedBlockIndex].isAlreadyUsed = false;
            }
        }
    
        const movingBlockIndex = newCurrentAnswers.findIndex(answer => answer.id === parseInt(block_id));
    
        if(movingBlockIndex !== -1) {
            newCurrentAnswers[movingBlockIndex].isAlreadyUsed = true;
            newUserAnswers[areaId] = newCurrentAnswers[movingBlockIndex];
        }
    
        setCurrentAnswers(newCurrentAnswers);
        setUserAnswers(newUserAnswers);
    };

    return (
        <EnterExitWraper>
        <div>
            <QuizAnswerModal id={id} show={showModal} setShow={setShowModal} isCorrect={isCorrectAnswer}/>
            {isLoading && <LoadingIndicator/>}
            {quizData ?
            <div className={cl.mainWrapper} style={isLoading ? {opacity: 0} : {}}>
                <div className={cl.quizNavigationWrapeer}>
                    <button className={cl.quizNavButton} onClick={() => navigate(QUIZE_ITEM_ROUTE + `/${parseInt(id) - 1}`)}>&#129092; Предыдущий</button>
                    <button className={cl.quizNavButton} onClick={() => navigate(QUIZE_LIST_ROUTE)}>&#128221; Список</button>
                    <button className={cl.quizNavButton} onClick={() => navigate(QUIZE_ITEM_ROUTE + `/${parseInt(id) + 1}`)}>Следующий &#129094;</button>
                </div>
                    
                    <div className={cl.qestionWrapper}>
                        {quizData.type === 'form' &&
                            (isSolved ?
                                <div className={cl.qestionWrapper}>
                                    <div className={cl.quizCard}>
                                        <h2 className={cl.quizTitle}>{quizData.id}. {quizData.title}</h2>
                                        <p className={cl.quizDescription}>{quizData.text}</p>
                                    </div>
                                    <div className={cl.devider}></div>
                                    <div className={cl.answerBar}>
                                        {correctAnswers.map((answer, index) =>
                                            <div
                                                key={index}
                                                className={`${cl.answerWrapper} ${answer?.is_correct ? cl.correctAnswer : ""}`}
                                            >
                                                {answer.answer}
                                            </div>
                                        )}
                                    </div>
                                    <button className={`${cl.AnswerBtn} ${cl.AnswerBtnInactive}`}>ОТВЕТИТЬ</button>
                                </div>
                            :
                                <div>
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
                                </div>
                            )
                        }
                        {quizData.type === 'drag' && quizData  && answers  &&
                            (isSolved && correctAnswers.length > 0 ?
                                <div className={cl.draggableQuestionWrapper}>
                                    <div className={cl.qestionText}>
                                        <div className={cl.quizCard}>
                                            <h2 className={cl.quizTitle}>{quizData.id}. {quizData.title}</h2>
                                        </div>
                                    
                                        <div className={cl.draggableQuestionTextWrapper}>
                                            {questionFlow.map((elem, index) => (
                                                index < questionFlow.length - 1 ?
                                                [
                                                    <p
                                                        key={index}
                                                        className={cl.qestionElemText}
                                                    >
                                                    {elem}
                                                    </p>, 
                                                    <DNDArea
                                                        key={index + 1}
                                                        id={index}
                                                        handleDrop={handleDrop}
                                                        text={correctAnswers[index].text}
                                                        isQestionArea={true}
                                                        isSolved={true}
                                                    />
                                                ]
                                                :
                                                <p key={index} className={cl.qestionElemText}>{elem}</p>
                                            ))}
                                        </div>
                                        <div className={cl.devider}></div>
                                    </div>
                                </div>
                            :
                                <div className={cl.draggableQuestionWrapper}>
                                    <div className={cl.qestionText}>
                                        <div className={cl.quizCard}>
                                            <h2 className={cl.quizTitle}>{quizData.id}. {quizData.title}</h2>
                                        </div>
                                    
                                        <div className={cl.draggableQuestionTextWrapper}>
                                            {questionFlow.map((elem, index) => (
                                                index < questionFlow.length - 1 ?
                                                [
                                                    <p
                                                        key={index}
                                                        className={cl.qestionElemText}
                                                    >
                                                    {elem}
                                                    </p>, 
                                                    <DNDArea
                                                        key={index + 1}
                                                        id={index}
                                                        handleDrop={handleDrop}
                                                        text={userAnswers[index]?.text || ''}
                                                        isQestionArea={true}
                                                    />
                                                ]
                                                :
                                                <p key={index} className={cl.qestionElemText}>{elem}</p>
                                            ))}
                                        </div>
                                        <div className={cl.devider}></div>
                                    </div>
                                    <div className={cl.answers}>
                                        {currentAnswers.map((answer, index) => (
                                        <DNDArea
                                            handleDrop={handleDrop}
                                            id={answer.id}
                                            key={answer.id}
                                            text={answer.text}
                                            isAlreadyUsed={answer.isAlreadyUsed}
                                            isQestionArea={false}
                                        />
                                        ))}
                                    </div>
                                </div>
                            )

                        }
                        {!isSolved &&
                            <button className={cl.AnswerBtn} onClick={giveAnswer}>ОТВЕТИТЬ</button>
                        }
                    </div>
                </div>
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