import React from 'react';
import cl from './NavbarButton.module.css'

const NavbarButton = ({children, ...props}) => {
    return (
        <button {...props} className={cl.navBtn}>
            {children}
        </button>
    );
};

export default NavbarButton;