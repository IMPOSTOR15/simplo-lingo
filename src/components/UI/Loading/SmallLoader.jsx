import React from 'react';
import cl from './SmallLoader.module.css'
import EnterExitWraper from '../Animation/EnterExitWrapper';
const SmallLoader = () => {
    return (
        <EnterExitWraper>
        <div className={cl.loadingWrapper}>
            <div className={cl.ldsRing}><div></div><div></div><div></div><div></div></div>
        </div>
        </EnterExitWraper>
        
    );
};

export default SmallLoader;