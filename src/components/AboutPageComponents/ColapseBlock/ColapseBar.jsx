import React from 'react';
import ColapseElem from './ColapseElem';
import cl from './ColapseBar.module.css'
const ColapseBar = () => {
    return (
        <div className={cl.colapseWrapper}>
            <h2 className={cl.colapseHeader}>Почему выбирают SimploLingo?</h2>
            <ColapseElem label="1. Эффективное изучение языка">
                <p className={cl.collapseText}>
                    SimploLingo тщательно разработано, чтобы помочь вам улучшить свои навыки английского быстро и эффективно. Наши тесты и викторины фокусируются на ключевых языковых аспектах, предоставляя целенаправленные упражнения для закрепления знаний и расширения словарного запаса.
                </p>
            </ColapseElem>
            <ColapseElem label="2. Занимательное и интересное обучение">
                <p className={cl.collapseText}>
                    Изучение английского не должно быть скучным. SimploLingo предлагает увлекательный и интерактивный опыт обучения, который помогает поддерживать мотивацию и желание учиться. Прощайте монотонные упражнения, добро пожаловать в захватывающее путешествие обучения языку!
                </p>
            </ColapseElem>
            <ColapseElem label="3. Подходит для всех уровней">
                <p className={cl.collapseText}>
                    Независимо от вашего уровня владения языком, SimploLingo подстраивается под ваши потребности. Начните с вашего текущего уровня и продвигайтесь в своем темпе. Наш контент адаптирован для обучения учеников различного уровня владения английским, гарантируя, что вы всегда найдете подходящий уровень сложности.
                </p>
            </ColapseElem>
        </div>
    );
};

export default ColapseBar;