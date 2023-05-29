import React from 'react';
import cl from './MainButton.module.css'
const Mainbutton = ({children, ...props}) => {
    return (
        <button {...props} className={cl.mainBtn}>
            {children}
        </button>
    );
};

export default Mainbutton;