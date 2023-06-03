import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import cl from '../components/quizPageComponents/QuizPage.module.css'
import ThemeRow from '../components/quizPageComponents/ThemeRow';
import QuizListItem from '../components/quizPageComponents/QuizListItem';
import { getAllQestions } from '../http/qestionApi';
const quizPage = observer(() => {
    const [quizArr, setQuizArr] = useState([])
    // const [sortType, setSortType] = useState('')
    useEffect(() => {
        getAllQestions().then(
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
                        title={quiz.text}
                        dificulty={quiz.dificult}
                    />
                )
            }
        </div>
    );
});

export default quizPage;