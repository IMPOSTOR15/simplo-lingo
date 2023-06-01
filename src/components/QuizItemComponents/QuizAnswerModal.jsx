import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import cl from './QuizAnswerModal.module.css'
import { Context } from '../..';
import SuccesIco from '../UI/SVGIcons/SuccesIco';
import ErrorIco from '../UI/SVGIcons/ErrorIco';

const QuizAnswerModal = observer(({show, setShow}) => {
    const {user} = useContext(Context)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [file, setfile] = useState(null)
    useEffect(() => {
        let userid
        if (user.user.id) {
            userid = user.user.id
        } else {
            userid = localStorage.getItem('user_id')
        }
        
    }, [show])
    const selectFile = e => {
        setfile(e.target.files[0])
    }
    useEffect(() => {

    }, [])

    
    
    if (!show) {
        return null
    }

    return (
        <div className={cl.modal}>
            <div className={cl.modalContent}>
                <div className={cl.modalHeader}>
                    РЕДАКТИРОВАТЬ ПРОФИЛЬ
                </div>
                <div className={cl.modalBody}>
                    <SuccesIco/>
                    <ErrorIco/>

                </div>
                <div className={cl.modalFooter}>
                    <button className={cl.modalButton} onClick={() => setShow(false)}>В профиль</button>
                    <button className={cl.modalButton} onClick={() => setShow(false)}>Перейти к следующему</button>
                    
                </div>
                <button className={cl.exitButton} onClick={() => setShow(false)}>Закрыть</button>
            </div>
        </div>
    );
});

export default QuizAnswerModal;