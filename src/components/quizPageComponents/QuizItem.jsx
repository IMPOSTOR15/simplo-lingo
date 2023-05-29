import React from 'react';
import cl from './QuizItem.module.css'
const QuizItem = ({...props}) => {
    return (
        <div className={`${cl.mainWrapper} ${props.id % 2 === 0 ? cl.quizBackgroundEven : cl.quizBackgroundOdd}`}>
            <div className={cl.quizTitle}>
                <p className={cl.quizTitleText}>{props.id}. {props.title}</p>
            </div>
            <div className={cl.rightSide}>
                <div
                    className={` ${cl.quizDiffFlag}
                        ${props.dificulty === 'easy' ? cl.quizDiffEasy : ''}
                        ${props.dificulty === 'medium' ? cl.quizDiffMedium : ''}
                        ${props.dificulty === 'hard' ? cl.quizDiffHard : ''}
                    `}>{props.dificulty}</div>
                <button className={cl.quizButton}>ОТВЕТИТЬ</button>
            </div>
        </div>
    );
};

export default QuizItem;