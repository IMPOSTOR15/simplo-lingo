import React, { useState } from 'react';
import cl from './LoginForm.module.css'
import { NavLink } from 'react-router-dom';
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <div className={cl.loginForm}>
                <h2>Вход в профиль</h2>
                <div className={cl.textField}>
                    <label
                        className={cl.textField__label}
                        for="email"
                    >
                        E-mail
                    </label>
                    <input
                        className={cl.textField__input}
                        type='text'
                        name="email"
                        value={email}
                        placeholder='Введите e-mail'
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className={cl.textField}>
                    <label
                        className={cl.textField__label}
                        for="password"
                    >
                        Логин
                    </label>
                    <input
                        className={cl.textField__input}
                        type='password'
                        value={password}
                        name="password"
                        placeholder='Введите пароль'
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <p className={cl.registrationText}>Нет аккаунта? <NavLink className={cl.registrationLink} to={'/registration'}>Регистрация</NavLink></p>
                
                <button className={cl.LoginButton}>ВОЙТИ</button>
            </div>
        </div>
    );
};

export default LoginForm;