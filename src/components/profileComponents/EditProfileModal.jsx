import React, { useContext, useEffect, useState } from 'react';
import cl from './EditProfileModal.module.css'
import { editUser, getUserData } from '../../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import SmallLoader from '../UI/Loading/SmallLoader';

const EditProfileModal = observer(({show, setShow}) => {
    const [isLoading, setIsLoading] = useState(false)

    const {user} = useContext(Context)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [file, setfile] = useState(null)
    useEffect(() => {
        setIsLoading(true)
        let userid
        if (user.user.id) {
            userid = user.user.id
        } else {
            userid = localStorage.getItem('user_id')
        }
        getUserData(userid).then(data => {
            user.setUser(data)
            setName(user.user.name)
            setEmail(user.user.email)
            setIsLoading(false)
        })
        
    }, [show])
    const selectFile = e => {
        setfile(e.target.files[0])
    }
    const editUserData = () => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('id', localStorage.getItem('user_id'))
        formData.append('name', name)
        formData.append('email', email)
        formData.append('img', file)
        editUser(formData).then(data => {
            setIsLoading(false)
            setShow(false)
        })
    }

    
    
    if (!show) {
        return null
    }
    
    return (
        <div className={cl.modal}>
            <div className={cl.modalContent}>
                <div className={cl.modalHeader}>РЕДАКТИРОВАТЬ ПРОФИЛЬ</div>
                {isLoading && <SmallLoader/>}
                <div style={isLoading ? {display: "none"} : {}} className={cl.modalBody}>
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
                        {file?.name ?? "Загрузите аватар"}
                    </label>
                    <input
                        type='file'
                        id="upload-photo"
                        accept=".jpeg, .jpg, .gif, .png"
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