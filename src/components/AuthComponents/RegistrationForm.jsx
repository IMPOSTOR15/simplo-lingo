import React, { useContext,  useState } from 'react';
import cl from './RegistrationForm.module.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '../..';
import { PROFILE_ROUTE } from '../../utils/consts';
import {  registration } from '../../http/userAPI';
import Alert from '../UI/Alert/Alert';
import classNames from 'classnames';

const RegistrationForm = () => {
    const {user} = useContext(Context)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const navigate = useNavigate()
    const [errorText, setErorrText] = useState('')
    
    const click = async () => {
        try {
            if (password === confirmedPassword) {
                const data = await registration(email, password, 'user');
                user.setUser(data);
                user.setIsAuth(true);
                console.log(data);
                navigate(PROFILE_ROUTE);
            } else {
                setErorrText("Пароли не совпадают");
            }
        } 
        catch (e) {
            setErorrText("Ошибка регистрации");
        }
    }
    return (
        <div>
            <Alert errorText={errorText} setErorrText={setErorrText}></Alert>
            <div className={cl.loginForm}>
                <h2>Регистрация пользователя</h2>
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
                <div className={cl.textField}>
                    <label
                        className={cl.textField__label}
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
                
                <button 
                    onClick={ password === confirmedPassword && password !== '' && email !== '' ? click : null}
                    className={classNames(cl.LoginButton, (password !== confirmedPassword || password === '' || email === '') && cl.inactiveBtn)}
                >
                    РЕГИСТРАЦИЯ
                </button>
            </div>
        </div>
    );
};

export default RegistrationForm;