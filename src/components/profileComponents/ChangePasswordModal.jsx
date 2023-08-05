import React, { useContext, useEffect, useState } from 'react';
import SmallLoader from '../UI/Loading/SmallLoader';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import { changePassword, getUserData } from '../../http/userAPI';
import cl from './ChangePasswordModal.module.css'
import Alert from '../UI/Alert/Alert';

const changePasswordModal = observer(({isOpen, onClose}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useContext(Context)

  const [newPassword, setNewPassword] = useState('')
  const [confirmedNewPassword, setConfirmedNewPassword] = useState('')

  const [errorText, setErrorText] = useState('')

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
        setIsLoading(false)
    })
  }, [isOpen])

  if (!isOpen) {
    return null
  }
  
  const changePasswordModal = async () => {
    try {
      if (newPassword === confirmedNewPassword) {
        await changePassword(user.user.id, newPassword)
      } else {
        setErrorText('пароли не совпадают')
      }
    } catch (e)  {
      setErrorText(e.text)
    }
  }

  return (
    <>
      {isLoading && <SmallLoader/>}
      <Alert errorText={errorText} setErorrText={setErrorText} />
      <div style={isLoading ? {display: "none"} : {}} className={cl.modalBody}>     
        <label>Новый пароль</label>
        <input
            type='text'
            className={cl.modalInput}
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder='Введите новый пароль'
        />

        <label>Повторите пароль</label>
        <input
            type='text'
            className={cl.modalInput}
            value={confirmedNewPassword}
            onChange={e => setConfirmedNewPassword(e.target.value)}
            placeholder='Повторите новый пароль'
        />
      </div>
      <div className={cl.modalFooter}>
        <button className={cl.confirmButton} onClick={() => changePasswordModal()}>Измениь пароль</button>
      </div>
    </>
              

  );
});

export default changePasswordModal;