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
    const [errorText, setErrorText] = useState('')
    const [validEmail, setValidEmail] = useState(true)
    const [validPassword, setValidPassword] = useState(true)

    const navigate = useNavigate()

    const handleChangeEmail = (event) => {
        const input = event.target.value;
        setEmail(input);
        setValidEmail(validateEmail(input));
    };

    const handleChangePassword = (event) => {
        const input = event.target.value;
        setPassword(input);
        setValidPassword(validatePassword(event))
    }

    const validateEmail = (input) => {
        if(!input) return true
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(input);
        return isValid
    };

    const validatePassword = (input) => {
        const isValid = input.length >= 8;
        return isValid
    };

    const registerUser = async () => {
        const data = await registration(email, password, 'user');
        user.setUser(data);
        user.setIsAuth(true);
        console.log(data);
        navigate(PROFILE_ROUTE);
      };
      
    const click = async () => {
        try {
            if (password !== confirmedPassword) {
                setErrorText("Пароли не совпадают");
                return;
            }
            if (!validatePassword(password)) {
                setErrorText("Пароль должен быть длиннее 8 символов");
                return;
            }
            if (!validateEmail(email)) {
                setErrorText("Введите корректный email");
                return;
            }
            await registerUser();
        } catch (e) {
            setErrorText("Ошибка регистрации");
            console.log(e);
        }
    };
    return (
        <div>
            <Alert errorText={errorText} setErorrText={setErrorText}></Alert>
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
                        onChange={e => handleChangeEmail(e)}
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
                        onChange={e => handleChangePassword(e)}
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