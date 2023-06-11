import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import cl from '../components/quizPageComponents/QuizPage.module.css'
import ThemeRow from '../components/quizPageComponents/ThemeRow';
import QuizListItem from '../components/quizPageComponents/QuizListItem';
import { getQuestionsFilterBySolvedAndTheme } from '../http/qestionApi';
import { Context } from '..';
import NoData from '../components/UI/NotFound/NoData';
import LoadingIndicator from '../components/UI/Loading/LoadingIndicator';
import EnterExitWraper from '../components/UI/Animation/EnterExitWrapper';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const quizPage = observer(() => {
    const [isLoading, setIsLoading] = useState(true)

    const [quizArr, setQuizArr] = useState([])
    const {user} = useContext(Context)
    const [theme, setTheme] = useState('')
    const [dificult, setDificult] = useState('')
    // const [sortType, setSortType] = useState('')
    useEffect(() => {
        setIsLoading(true)
        let userid
        if (user.user.id) {
            userid = user.user.id
        } else {
            userid = localStorage.getItem('user_id')
        }
        getQuestionsFilterBySolvedAndTheme(userid, dificult, theme).then(
            data => {
                setQuizArr(data.rows.sort((a,b) => a.id - b.id))
                setIsLoading(false)
            }
        )
    }, [user.user.id, dificult, theme])
    return (
        <EnterExitWraper>
        <div className={cl.mainWrapper}>
            <h1 className={cl.headerText}>СПИСОК ВОПРОСОВ</h1>
            <ThemeRow
                theme={theme}
                setTheme={setTheme}
                dificult={dificult}
                setDificult={setDificult}
            
            />
            {isLoading && <LoadingIndicator top={"50%"}/>}
            <div className={cl.tableWrapper} style={isLoading ? {opacity: 0} : {}}>
            {quizArr.length !== 0 ? (
                <TransitionGroup>
                    {quizArr.map((quiz, index) => (
                    <CSSTransition key={quiz.id} timeout={200} classNames="slide">
                        <QuizListItem
                        index={index}
                        id={quiz.id}
                        title={quiz.title}
                        dificulty={quiz.dificult}
                        isSolved={quiz.solvedByUser}
                        buttonText={'ОТВЕТИТЬ'}
                        />
                    </CSSTransition>
                    ))}
                </TransitionGroup>
                ) : (
                <NoData />
                )}
            </div>
        </div>
        </EnterExitWraper>
    );
});

export default quizPage;