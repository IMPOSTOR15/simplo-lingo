import React from 'react';
import cl from './QuizListItem.module.css'
import { useNavigate } from 'react-router-dom';
import { QUIZE_ITEM_ROUTE } from '../../utils/consts';

const QuizItem = ({...props}) => {
    let navigate = useNavigate();
    return (
        <div className={`${cl.mainWrapper} ${props.index % 2 === 0 ? cl.quizBackgroundEven : cl.quizBackgroundOdd}`}>
            <div className={cl.quizTitle}>
                <p className={cl.quizTitleText}>{props.id}. {props.title}</p>
            </div>
            <div className={cl.rightSide}>
                <div
                    className={` ${cl.quizDiffFlag}
                        ${props.dificulty.includes('easy') ? cl.quizDiffEasy : ''}
                        ${props.dificulty.includes('medium') ? cl.quizDiffMedium : ''}
                        ${props.dificulty.includes('hard') ? cl.quizDiffHard : ''}
                    `}>{props.dificulty}</div>
                <button className={cl.quizButton} onClick={()=> navigate(QUIZE_ITEM_ROUTE + '/' + props.id)} >ОТВЕТИТЬ</button>
            </div>
        </div>
    );
};

export default QuizItem;