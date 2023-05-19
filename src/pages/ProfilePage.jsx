import React from 'react';
import cl from "../components/profileComponents/ProfilePage.module.css"
const ProfilePage = () => {
    return (
        <div className={cl.mainWrapper}>
            <div className={cl.row}>
                <div className={cl.card}>   
                    <h2 className={cl.cardHeader}>Информация о профиле</h2>
                    <div className={cl.infoCard}>
                        <div className={cl.infoColumn}>
                            <p className={cl.infoParagraph}>Имя:</p>
                            <p className={cl.infoParagraph}>e-mail:</p>
                            <p className={cl.infoParagraph}>Уровень:</p>
                            <p className={cl.infoParagraph}>Решено вопросов:</p>
                            <p className={cl.infoParagraph}>Дней подряд:</p>
                        </div>
                        <div className={cl.infoRow}>
                            <p className={cl.infoParagraph}>meltdowm</p>
                            <p className={cl.infoParagraph}>123@sdfk.sdf</p>
                            <p className={cl.infoParagraph}>5</p>
                            <p className={cl.infoParagraph}>120</p>
                            <p className={cl.infoParagraph}>13</p>
                        </div>
                    </div>
                </div>
                <div className={cl.card}>   
                    <h2 className={cl.cardHeader}>Рейтинг</h2>
                    <div className={cl.randCircle}>
                        
                    </div>
                    <p className={cl.scoreStr}>100pts</p>
                </div>
                <div className={cl.logoCard}>
                    <img className={cl.logoImg} src="https://avatars.githubusercontent.com/u/62654099?v=4" alt="" />
                </div> 
            </div>
            <div>
                <div className={cl.column}>
                    <h2 className={cl.cardHeader}>Последнии решенные вопросы</h2>
                    <div className={cl.lastQestions}>
                        <div className={cl.qestionCard}>1. Who will win?</div>
                        <div className={cl.qestionCard}>2. Who will lose?</div>
                        <div className={cl.qestionCard}>3. Who will draw?</div>
                        <div className={cl.qestionCard}>1. Who will win?</div>
                        <div className={cl.qestionCard}>2. Who will lose?</div>
                        <div className={cl.qestionCard}>3. Who will draw?</div>
                        <div className={cl.qestionCard}>1. Who will win?</div>
                        <div className={cl.qestionCard}>2. Who will lose?</div>
                        <div className={cl.qestionCard}>3. Who will draw?</div>
                        <div className={cl.qestionCard}>1. Who will win?</div>
                        <div className={cl.qestionCard}>2. Who will lose?</div>
                        <div className={cl.qestionCard}>3. Who will draw?</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;