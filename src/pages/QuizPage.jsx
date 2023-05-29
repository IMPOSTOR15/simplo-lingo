import { observer } from 'mobx-react-lite';
import React from 'react';
import cl from '../components/quizPageComponents/QuizPage.module.css'
import ThemeRow from '../components/quizPageComponents/ThemeRow';
import QuizItem from '../components/quizPageComponents/QuizItem';
const quizPage = observer(() => {
    const quizSmaple = [
        {
            id: '1',
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, amet.',
            dificulty: 'easy'
        },
        {
            id: '2',
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, amet.',
            dificulty: 'medium'
        },
        {
            id: '3',
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, amet.',
            dificulty: 'easy'
        },
        {
            id: '4',
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, amet.',
            dificulty: 'easy'
        },
        {
            id: '5',
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, amet.',
            dificulty: 'medium'
        },
        {
            id: '6',
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, amet.',
            dificulty: 'hard'
        },
    ]
    return (
        <div className={cl.mainWrapper}>
            <h1 className={cl.headerText}>СПИСОК ВОПРОСОВ</h1>
            <ThemeRow/>
            {
                quizSmaple.map((quiz) =>
                    <QuizItem
                        key={quiz.id}
                        id={quiz.id}
                        title={quiz.title}
                        dificulty={quiz.dificulty}
                    />
                )
            }
        </div>
    );
});

export default quizPage;