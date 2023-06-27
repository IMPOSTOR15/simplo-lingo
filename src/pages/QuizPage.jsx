import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef, useState } from 'react';
import cl from '../components/quizPageComponents/QuizPage.module.css'
import ThemeRow from '../components/quizPageComponents/ThemeRow';
import QuizListItem from '../components/quizPageComponents/QuizListItem';
import { getQuestionsFilterBySolvedAndTheme } from '../http/qestionApi';
import { Context } from '..';
import NoData from '../components/UI/NotFound/NoData';
import LoadingIndicator from '../components/UI/Loading/LoadingIndicator';
import EnterExitWraper from '../components/UI/Animation/EnterExitWrapper';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useObserver } from '../hooks/useObserver';



const quizPage = observer(() => {
    const [isLoading, setIsLoading] = useState(true)

    const [quizArr, setQuizArr] = useState([])
    const {user} = useContext(Context)
    const [theme, setTheme] = useState('')
    const [dificult, setDificult] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(5)
    const [limit, setLimit] = useState(10);
    // const [sortType, setSortType] = useState('')

    const lastElement = useRef();
    // useEffect(() => {
    //     setIsLoading(true)
    //     let userid
    //     if (user.user.id) {
    //         userid = user.user.id
    //     } else {
    //         userid = localStorage.getItem('user_id')
    //     }
    //     console.log("userid, dificult, theme, limit, page", userid, dificult, theme, limit, page);
    //     getQuestionsFilterBySolvedAndTheme(userid, dificult, theme, limit, page).then(
    //         data => {
    //             setQuizArr([...quizArr, ...data.rows])
    //             setTotalPages(Math.ceil(data.count / limit))
    //             console.log("setTotalPages",Math.ceil(data.count / limit));
    //             setIsLoading(false)
    //         }
    //     )
    // }, [page])

    // useEffect(() => {
    //     setIsLoading(true)
    //     setPage(1)
    //     let userid
    //     if (user.user.id) {
    //         userid = user.user.id
    //     } else {
    //         userid = localStorage.getItem('user_id')
    //     }
    //     console.log("userid, dificult, theme, limit, page", userid, dificult, theme, limit, page);
    //     getQuestionsFilterBySolvedAndTheme(userid, dificult, theme, limit, page).then(
    //         data => {
    //             setQuizArr([...data.rows])
    //             setTotalPages(Math.ceil(data.count / limit))
    //             console.log("setTotalPages",Math.ceil(data.count / limit));
    //             setIsLoading(false)
    //         }
    //     )
    // }, [dificult, theme])

    useEffect(() => {
        setPage(1);
    }, [dificult, theme]);
    
    useEffect(() => {
        setIsLoading(true)
        let userid = user.user.id ? user.user.id : localStorage.getItem('user_id');
        console.log("userid, dificult, theme, limit, page", userid, dificult, theme, limit, page);
    
        getQuestionsFilterBySolvedAndTheme(userid, dificult, theme, limit, page).then(data => {
            if (page === 1) {
                setQuizArr([...data.rows]);
            } else {
                setQuizArr(oldQuizArr => [...oldQuizArr, ...data.rows]);
            }
    
            setTotalPages(Math.ceil(data.count / limit));
            console.log("setTotalPages", Math.ceil(data.count / limit));
            setIsLoading(false);
        });
    }, [dificult, theme, page]);

    useObserver(lastElement, page < totalPages, isLoading, () => {
        console.log("page", page);
        setTimeout(() => {
            console.log("paging");
            setPage(page + 1);
        }, 200)
        
    })

    return (
        <div>
            <EnterExitWraper>
                <div className={cl.mainWrapper}>
                
                    
                    <h1 className={cl.headerText}>СПИСОК ВОПРОСОВ</h1>
                    <ThemeRow
                        theme={theme}
                        setTheme={setTheme}
                        dificult={dificult}
                        setDificult={setDificult}
                    
                    />
                    
                    <div className={cl.tableWrapper} style={isLoading ? {opacity: 0} : {}}>
                    {quizArr.length !== 0 ? 
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
                    :
                        <NoData />
                    }
                    </div>
                    {isLoading && <LoadingIndicator position={"relative"} top={'auto'}/>}
                </div>
                
            </EnterExitWraper>
            <div ref={lastElement} style={{height: 20, background: 'transperent'}}></div>
        </div>
    );
});

export default quizPage;