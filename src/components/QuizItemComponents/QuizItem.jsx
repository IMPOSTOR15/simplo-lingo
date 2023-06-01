import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cl from './QuizItem.module.css'
import { getQestionsById } from '../../http/qestionApi';
import { getQestionAnswers } from '../../http/answersApi';
import Mainbutton from '../UI/Buttons/Mainbutton';
import QuizAnswerModal from './QuizAnswerModal';
const QuizItem = () => {
    const {id} = useParams()
    const [showModal, setShowModal] = useState({})
    const [quizData, setQuizData] = useState({})
    const [answers, setAnswers] = useState([])
    const [pikedAnswer, setPikedAnswer] = useState({})
    useEffect(() => {
        getQestionsById(id).then(data => setQuizData(data))
        getQestionAnswers(id).then(data => setAnswers(data))
    }, [])
    // useEffect(() => {
    //     console.log(pikedAnswer);
    // }, [pikedAnswer])

    // useEffect(() => {
    //     fetchOneQuiz(id).then(data => setQuiz(data))
    // }, [])
    return (
        <div className={cl.mainWrapper}>
            <QuizAnswerModal show={showModal} setShow={setShowModal}/>
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
            <button className={cl.AnswerBtn} onClick={() => {setShowModal(true)}}>ОТВЕТИТЬ</button>
        </div>
    );
};

export default QuizItem;