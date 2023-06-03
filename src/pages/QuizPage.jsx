import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import cl from '../components/quizPageComponents/QuizPage.module.css'
import ThemeRow from '../components/quizPageComponents/ThemeRow';
import QuizListItem from '../components/quizPageComponents/QuizListItem';
import { getAllQestions, getQuestionsFilterBySolved, getSolvedQuestions } from '../http/qestionApi';
import { Context } from '..';
const quizPage = observer(() => {
    const [quizArr, setQuizArr] = useState([])
    const {user} = useContext(Context)
    // const [sortType, setSortType] = useState('')
    useEffect(() => {
        let userid
        if (user.user.id) {
            userid = user.user.id
        } else {
            userid = localStorage.getItem('user_id')
        }

        getQuestionsFilterBySolved(userid).then(
            data => {
                console.log(data);
                setQuizArr(data.sort((a,b) => a.id - b.id))
            }
        )
    }, [])
    return (
        <div className={cl.mainWrapper}>
            <h1 className={cl.headerText}>СПИСОК ВОПРОСОВ</h1>
            <ThemeRow/>
            {
                quizArr.map((quiz,index) =>
                    <QuizListItem
                        key={quiz.id}
                        index={index}
                        id={quiz.id}
                        title={quiz.title}
                        dificulty={quiz.dificult}
                        isSolved={quiz.solvedByUser}
                        buttonText={'ОТВЕТИТЬ'}
                    />
                )
            }
        </div>
    );
});

export default quizPage;