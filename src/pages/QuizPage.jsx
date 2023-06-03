import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import cl from '../components/quizPageComponents/QuizPage.module.css'
import ThemeRow from '../components/quizPageComponents/ThemeRow';
import QuizListItem from '../components/quizPageComponents/QuizListItem';
import { getQuestionsFilterBySolvedAndTheme } from '../http/qestionApi';
import { Context } from '..';
import NoData from '../components/UI/NotFound/NoData';
const quizPage = observer(() => {
    const [quizArr, setQuizArr] = useState([])
    const {user} = useContext(Context)
    const [theme, setTheme] = useState('')
    const [dificult, setDificult] = useState('')
    // const [sortType, setSortType] = useState('')
    useEffect(() => {
        let userid
        if (user.user.id) {
            userid = user.user.id
        } else {
            userid = localStorage.getItem('user_id')
        }
        getQuestionsFilterBySolvedAndTheme(userid, dificult, theme).then(
            data => {
                console.log(data);
                setQuizArr(data.rows.sort((a,b) => a.id - b.id))
                console.log(quizArr);
            }
        )
    }, [user.user.id, dificult, theme])
    return (
        <div className={cl.mainWrapper}>
            <h1 className={cl.headerText}>СПИСОК ВОПРОСОВ</h1>
            <ThemeRow
                theme={theme}
                setTheme={setTheme}
                dificult={dificult}
                setDificult={setDificult}
            
            />
            {quizArr.length !== 0 ?
                (quizArr.map((quiz,index) =>
                    <QuizListItem
                        key={quiz.id}
                        index={index}
                        id={quiz.id}
                        title={quiz.title}
                        dificulty={quiz.dificult}
                        isSolved={quiz.solvedByUser}
                        buttonText={'ОТВЕТИТЬ'}
                    />
                ))
                :
                <NoData/>
            }
            
        </div>
    );
});

export default quizPage;