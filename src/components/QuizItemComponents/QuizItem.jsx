import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cl from './QuizItem.module.css'
import { getQestionsById } from '../../http/qestionApi';
import { getQestionAnswers } from '../../http/answersApi';
const QuizItem = () => {
    const {id} = useParams()
    const [quizData, setQuizData] = useState({})
    const [answers, setAnswers] = useState([])
    const quizExample = {
        id: '14',
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, non.',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolores eum. Illo facere nulla nam? Tenetur laboriosam reiciendis nesciunt provident!',
        answers: ['Answer 1', 'Answer 2', 'Answer 3','Answer 4'],
    }
    useEffect(() => {
        getQestionsById(id).then(data => setQuizData(data))
        getQestionAnswers(id).then(data => setAnswers(data))
    }, [])

    // useEffect(() => {
    //     fetchOneQuiz(id).then(data => setQuiz(data))
    // }, [])
    return (
        <div className={cl.mainWrapper}>
            <div className={cl.quizCard}>
                <h2 className={cl.quizTitle}>{quizData.id}. {quizData.title}</h2>
                <p className={cl.quizDescription}>{quizData.text}</p>
            </div>
            <div className={cl.devider}></div>
            <div className={cl.answerBar}>
                {answers.map((answer, index) => 
                    <div key={index} className={cl.answerWrapper}>{answer.answer}</div>
                )}
            </div>
        </div>
    );
};

export default QuizItem;