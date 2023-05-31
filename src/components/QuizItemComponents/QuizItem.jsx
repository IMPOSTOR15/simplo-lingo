import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cl from './QuizItem.module.css'
const QuizItem = () => {
    const {id} = useParams()
    const quizExample = {
        id: '14',
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, non.',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, dolores eum. Illo facere nulla nam? Tenetur laboriosam reiciendis nesciunt provident!',
        answers: ['Answer 1', 'Answer 2', 'Answer 3','Answer 4'],
    }
    // useEffect(() => {
    //     fetchOneQuiz(id).then(data => setQuiz(data))
    // }, [])
    return (
        <div className={cl.mainWrapper}>
            <div className={cl.quizCard}>
                <h2 className={cl.quizTitle}>{quizExample.id}. {quizExample.title}</h2>
                <p className={cl.quizDescription}>{quizExample.description}</p>
            </div>
            <div className={cl.devider}></div>
            <div className={cl.answerBar}>
                {quizExample.answers.map((answer, index) => 
                    <div key={index} className={cl.answerWrapper}>{answer}</div>
                )}
            </div>
        </div>
    );
};

export default QuizItem;