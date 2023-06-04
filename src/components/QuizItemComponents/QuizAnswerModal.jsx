import { observer } from 'mobx-react-lite';
import React from 'react';
import cl from './QuizAnswerModal.module.css'
import SuccesIco from '../UI/SVGIcons/SuccesIco';
import ErrorIco from '../UI/SVGIcons/ErrorIco';
import { useNavigate } from 'react-router-dom';
import { PROFILE_ROUTE } from '../../utils/consts';

const QuizAnswerModal = observer(({show, setShow, isCorrect}) => {

    const navigate = useNavigate()
    if (!show) {
        return null
    }

    const toProfile = () => {
        setShow(false)
        navigate(PROFILE_ROUTE)
    }

    return (
        <div className={cl.modal}>
            <div className={cl.modalContent}>
                <div className={cl.modalHeader}>
                    { isCorrect ?
                        "ПРАВИЛЬНО"
                        :
                        "НЕВЕРНО"
                    }
                </div>
                <div className={cl.modalBody}>
                    <div className={cl.icoAnim}>
                    { isCorrect ?
                        <SuccesIco/>
                        :
                        <ErrorIco/>
                    }
                    </div>
                    
                </div>
                <div className={cl.modalFooter}>
                    <button className={cl.modalButton} onClick={() => setShow(false)}>СЛЕДУЮЩИЙ</button>
                    <button className={cl.exitButton} onClick={() => toProfile()}>ПРОФИЛЬ</button>
                </div>
                
            </div>
        </div>
    );
});

export default QuizAnswerModal;