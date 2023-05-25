import styled, { css, keyframes } from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { useScroll } from 'react-use';

const darkViolet = '#894fb0';
const violet = '#d556fe'
const orange = '#ff6423'
const lightOrange = '#ff8652'


export const scrollDown = keyframes`
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(-100%); opacity: 0; }
`;

export const Nav = styled.nav`
    background: ${darkViolet};
    display: flex;
    // justify-content: space-between;
    padding: 1rem;
    color: #fff;
    position: relative;
`;

export const LogoContainer = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
        justify-content: center;
    }
`;

export const LogoImage = styled.img`
    height: 2rem;
    margin-right: 1rem;
    animation: ${props => props.scrollY > 0 && css`${scrollDown} 0.3s ease-in-out forwards`};
`;
export const Divider = styled.div`
    content: '';
    width: 3px;
    height: 40px;
    margin 0 20px;
    background: ${orange};
    display: block;
    z-index: 1;

`

export const Logo = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    @media (max-width: 768px) {
        // display: none;
    }
`;

export const NavLinks = styled.div`
    // display: none;
    width: 100%;
    display: flex;
    justify-content: start;
    opacity: 1;
    transform: translateY(0);
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    @media (max-width: 768px) {
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        background: ${darkViolet};
        width: 100%;
        transform: ${({ open }) => open ? 'translateY(0)' : 'translateY(-100%)'};
        opacity: ${({ open }) => open ? '1' : '0'};
        z-index: ${({ open }) => open ? '1' : '-1'};
        // z-index: 1;
    }
`;

export const StyledNavLink = styled(NavLink)`
    color: #fff;
    text-decoration: none;
    width: auto;
    position: relative;
    margin auto 20px;
    // justify-content: center;
    text-align: center;
    &.active {
        border-bottom: 2px solid #ff6423;
    }
    &:hover {
        color: #ff6423;
    }
    @media (max-width: 768px) {
        margin 10px 40%;
    }
`;
export const BurgerMenuButton = styled.button`
    display: none;
    color: #fff;
    font-size: 1.5rem;
    @media (max-width: 768px) {
        display: block;
        background: transparent;
        border: none;
    }
`;

export const ButtonAnimation = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
`;

export const LoginButton = styled.button`
    background: #ff6423;
    border: none;
    padding: 0.5rem 1rem;
    color: #fff;
    cursor: pointer;
    border-radius: 20px;
    transition: background 0.3s ease-in-out;
    &:hover {
        background: ${lightOrange};
        animation: ${ButtonAnimation} 0.6s ease-in-out;
    }

    @media (max-width: 768px) {
        margin: auto 20px auto auto;
    }
`;