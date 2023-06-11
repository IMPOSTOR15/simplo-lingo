import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

const EnterExitWraper = ({children}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Задержка перед появлением компонента
    setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => {
      // Задержка перед исчезновением компонента
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 300);

      return () => {
        clearTimeout(hideTimeout);
      };
    };
  }, []);

  return (
    <CSSTransition
      in={isVisible}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

export default EnterExitWraper;