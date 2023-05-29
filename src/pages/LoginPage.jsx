import React from 'react';
import LoginForm from '../components/AuthComponents/LoginForm';
import { useLocation } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import RegistrationForm from '../components/AuthComponents/RegistrationForm';
import { observer } from 'mobx-react-lite';

const LoginPage = observer(() => {
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
});

export default LoginPage;