import cl from "./Alert.module.css";
import React, { useEffect, useState } from "react";
import classNames from 'classnames';

export default function Alert({ errorText, setErorrText }) {
  const[showAlert, setShowAlert] = useState(false)

  const closeAlert = () => {
    setShowAlert(false)
    setErorrText('')
  }
  useEffect(() => {
    if (errorText) {
      setShowAlert(true)
      const timer = setTimeout(() => {
        setShowAlert(false);
        setErorrText('')
      }, 4000);
      
      return () => {
          clearTimeout(timer);
      };
    }
  }, [errorText])

  return (
    <div>
      {showAlert &&
        <div className={classNames(cl.alert)}>
          <span className={cl.closebtn} onClick={closeAlert}>
            &times;
          </span>
          {errorText}
        </div>
      }
    </div>
  );
}
