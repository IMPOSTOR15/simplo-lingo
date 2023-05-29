import React from 'react';
import cl from './ThemeRow.module.css'

const ThemeRow = () => {
    return (
        <div className={cl.themeBlock}>
            <h2 className={cl.themeHeader}>Вопросы по темам</h2>
            <div className={cl.tehemeRow}>
                <button className={cl.themeBtn}>Словарный запас</button>
                <button className={cl.themeBtn}>Времена</button>
                <button className={cl.themeBtn}>Лексика</button>
                <button className={cl.themeBtn}>Правописание</button>
                <button className={cl.themeBtn}>Граматика</button>
                <button className={cl.themeBtnAll}>Все темы</button>
            </div>
        </div>
    );
};

export default ThemeRow;