import React, { useContext, useState } from 'react';
import LoginForm from '../components/AuthComponents/LoginForm';
import { Context } from '..';
import { useLocation } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import RegistrationForm from '../components/AuthComponents/RegistrationForm';

const LoginPage = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    
    return (
        <div>
            {isLogin ? 
                <LoginForm/>
            :
                <RegistrationForm/>
            }   
        </div>
    );
};

export default LoginPage;