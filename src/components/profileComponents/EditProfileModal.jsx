import React, { useContext, useEffect, useState } from 'react';
import cl from './EditProfileModal.module.css'
import { editUser, getUserData } from '../../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';

const EditProfileModal = observer(({show, setShow}) => {
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
        getUserData(userid).then(data => user.setUser(data))
        if(user.user.name) {
            setName(user.user.name)
        }
        if(user.user.email) {
            setEmail(user.user.email)
        }
        
    }, [show])

    const selectFile = e => {
        setfile(e.target.files[0])
    }
    const editUserData = () => {
        const formData = new FormData()
        formData.append('id', localStorage.getItem('user_id'))
        formData.append('name', name)
        formData.append('email', email)
        formData.append('img', file)
        editUser(formData).then(data => setShow(false))
    }

    
    
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
                    <label>Имя</label>
                    <input
                        type='text'
                        className={cl.modalInput}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <label>Email</label>
                    <input
                        type='text'
                        className={cl.modalInput}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <label 
                        className={cl.uploadPhotoLabel}
                        htmlFor="upload-photo"
                    >
                        Загрузить аватар
                    </label>
                    <input
                        type='file'
                        id="upload-photo"
                        className={cl.modalPhotoInput}
                        onChange={selectFile}
                    />

                </div>
                <div className={cl.modalFooter}>
                    <button className={cl.editButton} onClick={() => editUserData()}>Применить</button>
                    <button className={cl.closeButton} onClick={() => setShow(false)}>Закрыть</button>
                </div>
            </div>
        </div>
    );
});

export default EditProfileModal;