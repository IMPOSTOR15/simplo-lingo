import cl from "./Alert.module.css";
import React, { useEffect } from "react";
import { useState } from "react";
import classNames from 'classnames';

export default function Alert({ children, showAlert, handleClose }) {

  return (
    <div>
      {showAlert &&
        <div className={classNames(cl.alert)}>
          <span className={cl.closebtn} onClick={() => handleClose(false)}>
            &times;
          </span>
          {children}
        </div>
      }
    </div>
    
    
  );
}