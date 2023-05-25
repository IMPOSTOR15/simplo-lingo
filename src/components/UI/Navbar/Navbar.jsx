import React, { useEffect, useState } from 'react';
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


const useScrollPosition = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollY;
};

const Navbar = () => {
    // const { y } = useScroll();
    const scrollY = useScrollPosition();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    let navigate = useNavigate();

    return (
        <Nav>
            <LogoContainer onClick={()=> navigate("/")}>
                <LogoImage src={logo} alt="logo" scrollY={scrollY} />
                <Logo>SimploLingo</Logo>
            </LogoContainer>
            <Divider/>
            <NavLinks open={open}>
                <StyledNavLink to="/link1" isActive={() => location.pathname.includes('/link1')}>Link 1</StyledNavLink>
                <StyledNavLink to="/link2" isActive={() => location.pathname.includes('/link2')}>Link 2</StyledNavLink>
                <StyledNavLink to="/link3" isActive={() => location.pathname.includes('/link3')}>Link 3</StyledNavLink>
            </NavLinks>
            <LoginButton onClick={()=> navigate("/login")}>Войти</LoginButton>
            <BurgerMenuButton onClick={() => setOpen(!open)}>
                <span>☰</span>
            </BurgerMenuButton>
        </Nav>
    );
};

export default Navbar;
    