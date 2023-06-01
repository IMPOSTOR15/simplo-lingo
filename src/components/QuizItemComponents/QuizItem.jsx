import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cl from './QuizItem.module.css'
import { getQestionsById } from '../../http/qestionApi';
import { getQestionAnswers } from '../../http/answersApi';
import QuizAnswerModal from './QuizAnswerModal';
import { giveCorrectAnswer } from '../../http/ratingApi';
import { Context } from '../..';
const QuizItem = () => {
    const {id} = useParams()
    const {user} = useContext(Context)
    const [showModal, setShowModal] = useState(false)
    const [quizData, setQuizData] = useState({})
    const [answers, setAnswers] = useState([])
    const [pikedAnswer, setPikedAnswer] = useState({})
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)
    useEffect(() => {
        getQestionsById(id).then(data => setQuizData(data))
        getQestionAnswers(id).then(data => setAnswers(data))
    }, [])
    const giveAnswer = () => {

        console.log(quizData);
        console.log(answers);
        
        if (quizData.correct_answer_id === pikedAnswer.id) {
            setIsCorrectAnswer(true)
            giveCorrectAnswer(quizData.id, pikedAnswer.id, user.user.id).then(data => console.log(data))
        } else {
            setIsCorrectAnswer(false)
        }
        
        setShowModal(true)
    }
    // useEffect(() => {
    //     console.log(pikedAnswer);
    // }, [pikedAnswer])

    // useEffect(() => {
    //     fetchOneQuiz(id).then(data => setQuiz(data))
    // }, [])
    return (
        <div className={cl.mainWrapper}>
            <QuizAnswerModal show={showModal} setShow={setShowModal} isCorrect={isCorrectAnswer}/>
            <div className={cl.quizCard}>
                <h2 className={cl.quizTitle}>{quizData.id}. {quizData.title}</h2>
                <p className={cl.quizDescription}>{quizData.text}</p>
            </div>
            <div className={cl.devider}></div>
            <div className={cl.answerBar}>
                {answers.map((answer, index) =>
                    <div key={index} className={`${cl.answerWrapper} ${answers[index]?.id === pikedAnswer?.id ? cl.answerWrapperActive : ""}`} onClick={()=> setPikedAnswer(answers[index])}>{answer.answer}</div>
                )}
            </div>
            <button className={cl.AnswerBtn} onClick={giveAnswer}>ОТВЕТИТЬ</button>
        </div>
    );
};

export default QuizItem;