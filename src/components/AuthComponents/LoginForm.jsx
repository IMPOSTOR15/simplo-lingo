import React, { useState } from 'react';
import cl from './LoginForm.module.css'
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { PROFILE_ROUTE } from '../../utils/consts';
const LoginForm = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const click = () => {
        navigate(PROFILE_ROUTE)
    }
    return (
        <div>
            <div className={cl.loginForm}>
                <h2>Вход в профиль</h2>
                <div className={cl.textField}>
                    <label
                        className={cl.textField__label}
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
                    >
                        Пароль
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
                
                <button className={cl.LoginButton} onClick={click}>ВОЙТИ</button>
            </div>
        </div>
    );
};

export default LoginForm;