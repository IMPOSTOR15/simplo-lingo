import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png'; // Путь до логотипа
import {
    Nav,
    LogoContainer,
    StyledNavLink,
    LoginButton,
    NavLinks,
    LogoImage,
    Logo,
    Divider,
    BurgerMenuButton
  } from './NavbarElements';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';
import { HOME_ROUTE, PROFILE_ROUTE, LOGIN_ROUTE, LEADERBOARD_ROUTE } from '../../../utils/consts';

const Navbar = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isPofile = location.pathname === PROFILE_ROUTE
    const [open, setOpen] = useState(false);
    let navigate = useNavigate();

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('user_id')
        localStorage.removeItem('auth')
        localStorage.removeItem('token')
        navigate(HOME_ROUTE)
    }

    return (
        <Nav>
            <LogoContainer onClick={()=> navigate("/")}>
                <LogoImage src={logo} alt="logo"/>
                <Logo>SimploLingo</Logo>
            </LogoContainer>
            <Divider/>
            <NavLinks open={open}>
                <StyledNavLink onClick={() => setOpen(false)} to="/link1">Link 1</StyledNavLink>
                <StyledNavLink onClick={() => setOpen(false)} to="/link2">Link 2</StyledNavLink>
                <StyledNavLink onClick={() => setOpen(false)} to={LEADERBOARD_ROUTE}>СПИСОК ЛИДЕРОВ</StyledNavLink>
            </NavLinks>
            {

            }
            {user.isAuth ?
                isPofile ?
                    <LoginButton onClick={() => logOut()}>ВЫЙТИ</LoginButton>
                :
                    <LoginButton onClick={()=> navigate(PROFILE_ROUTE)}>В ПРОФИЛЬ</LoginButton>
            :
                <LoginButton onClick={()=> navigate(LOGIN_ROUTE)}>ВОЙТИ</LoginButton>
            }
            
            <BurgerMenuButton onClick={() => setOpen(!open)}>
                <span>☰</span>
            </BurgerMenuButton>
        </Nav>
    );
});

export default Navbar;
    