import React, { useContext, useState } from 'react';
import cl from './RegistrationForm.module.css'
import { NavLink, Navigate } from 'react-router-dom';
import { Context } from '../..';
import { PROFILE_ROUTE } from '../../utils/consts';


const RegistrationForm = () => {
    const {user} = useContext(Context)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const click = async () => {
        try {
            let data;
                if (password === confirmedPassword) {
                    // data = await registration(email, password)

                } else {

                }
            user.setUser(data)
            user.setIsAuth(true)
            Navigate(PROFILE_ROUTE)
        } 
        catch (e) {
            alert(e.response.data.message)
        }
    }
    return (
        <div>
            <div className={cl.loginForm}>
                <h2>Регистрация пользователя</h2>
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
                <div className={cl.textField}>
                    <label
                        className={cl.textField__label}
                        for="confirmedPassword"
                    >
                        Повтоирте пароль
                    </label>
                    <input
                        className={cl.textField__input}
                        type='password'
                        value={confirmedPassword}
                        name="confirmedPassword"
                        placeholder='Повторите пароль'
                        onChange={e => setConfirmedPassword(e.target.value)}
                    />
                </div>
                {password !== confirmedPassword ? 
                    <p className={cl.errorText}>Пароли не совпадают</p>
                    :
                    <div></div>
                }
                <p className={cl.registrationText}>Есть аккаунт? <NavLink className={cl.registrationLink} to={'/login'}>Войти</NavLink></p>
                
                <button onClick={click} className={cl.LoginButton}>РЕГИСТРАЦИЯ</button>
            </div>
        </div>
    );
};

export default RegistrationForm;