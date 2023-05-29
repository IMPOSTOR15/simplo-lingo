import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { PROFILE_ROUTE } from '../../../utils/consts';
import { LOGIN_ROUTE } from '../../../utils/consts';

const Navbar = observer(() => {
    const {user} = useContext(Context)
    // const location = useLocation();
    const [open, setOpen] = useState(false);
    let navigate = useNavigate();

    return (
        <Nav>
            <LogoContainer onClick={()=> navigate("/")}>
                <LogoImage src={logo} alt="logo"/>
                <Logo>SimploLingo</Logo>
            </LogoContainer>
            <Divider/>
            <NavLinks open={open}>
                <StyledNavLink to="/link1">Link 1</StyledNavLink>
                <StyledNavLink to="/link2">Link 2</StyledNavLink>
                <StyledNavLink to="/link3">Link 3</StyledNavLink>
            </NavLinks>
            {

            }
            {user.isAuth ?
                <LoginButton onClick={()=> navigate(PROFILE_ROUTE)}>В ПРОФИЛЬ</LoginButton>
            :
                <LoginButton onClick={()=> navigate(LOGIN_ROUTE)}>Войти</LoginButton>
            }
            
            <BurgerMenuButton onClick={() => setOpen(!open)}>
                <span>☰</span>
            </BurgerMenuButton>
        </Nav>
    );
});

export default Navbar;
    