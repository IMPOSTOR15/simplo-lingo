import React, { useContext, useState } from 'react';
import cl from './LoginForm.module.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { PROFILE_ROUTE } from '../../utils/consts';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import { login } from '../../http/userAPI';
const LoginForm = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [valid, setValid] = useState(true);

    const handleChangeEmail = (event) => {
        const input = event.target.value;
        setEmail(input);
        setValid(validateEmail(input));
    };
    const handleChangePassword = (event) => {
        const input = event.target.value;
        setPassword(input);
    }

    const validateEmail = (input) => {
        if(!input) return true
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(input);
        return isValid
    };

    const login = async () => {
        try {
            if (validateEmail(email)) {
                let data = await login(email, password)
                user.setUser(data)
                user.setIsAuth(true)
                navigate(PROFILE_ROUTE)
            } else {
                setValid(false)
            }

        } catch (e) {
            alert(e.response.data.message)

        }
        
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
                        onChange={e => handleChangeEmail(e)}
                    />
                    { <p className={cl.errorText} style={!valid ? { color: 'rgb(255, 113, 113)' } : {opacity: 0}}>Введите корректный адрес электронной почты</p>}
                </div>
                <div className={cl.textField} style={{marginBottom: '10px'}}>
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
                <p className={cl.registrationText}>Нет аккаунта? <NavLink className={cl.registrationLink} to={'/registration'}>Регистрация</NavLink></p>
                
                <button className={cl.LoginButton} onClick={login}>ВОЙТИ</button>
            </div>
        </div>
    );
});

export default LoginForm;