import React from 'react';
import noDataIco from '../../../assets/no_data_ico.png'
import cl from './NoData.module.css'
const NoData = ({...props}) => {
    return (
        <div className={cl.noDataWrapper}>
            <img className={cl.noDataImg} src={noDataIco} alt="" />
            <h3 className={cl.noDataHeader}>Вопросы не найденны</h3>
        </div>
    );
};

export default NoData;