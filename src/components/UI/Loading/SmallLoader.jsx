import React from 'react';
import cl from './SmallLoader.module.css'
const SmallLoader = () => {
    return (
        <div className={cl.loadingWrapper}>
            <div className={cl.ldsRing}><div></div><div></div><div></div><div></div></div>
        </div>
        
    );
};

export default SmallLoader;