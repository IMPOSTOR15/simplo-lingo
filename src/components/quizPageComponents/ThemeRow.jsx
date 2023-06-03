import React from 'react';
import cl from './ThemeRow.module.css'

const ThemeRow = ({...props}) => {
    return (
        <div className={cl.themeBlock}>
            <h2 className={cl.themeHeader}>Вопросы по темам</h2>
            <div className={cl.tehemeRow}>
                <button
                    className={`${cl.themeBtn } ${props.theme === 'tenses' && cl.activeBtn}`}
                    onClick={() => props.setTheme('tenses')}
                >
                    Времена
                </button>
                <button
                    className={`${cl.themeBtn } ${props.theme === 'vocabulary' && cl.activeBtn}`}
                    onClick={() => props.setTheme('vocabulary')}
                >
                    Лексика
                </button>
                <button
                    className={`${cl.themeBtn } ${props.theme === 'spelling' && cl.activeBtn}`}
                    onClick={() => props.setTheme('spelling')}
                >
                    Правописание
                </button>
                <button
                    className={`${cl.themeBtn } ${props.theme === 'grammar' && cl.activeBtn}`}
                    onClick={() => props.setTheme('grammar')}
                >
                    Граматика
                </button>
                <button
                    className={cl.themeBtnAll}
                    onClick={() => props.setTheme('')}
                >
                    Все темы
                </button>
                
                <select name="dificult" id="" className={cl.diffucultSelect} onChange={(event) => props.setDificult(event.target.value)}>
                    <option value="" disabled selected>выбери сложность</option>
                    <option value="" className={cl.selectOption}>любая</option>
                    <option value="easy" className={cl.selectOption}>легкие</option>
                    <option value="medium" className={cl.selectOption}>средние</option>
                    <option value="hard" className={cl.selectOption}>тяжелые</option>
                </select>
            </div>
            
        </div>
    );
};

export default ThemeRow;