import React, { useRef, useState } from 'react';
import cl from "./ColapseElem.module.css"
const ColapseElem = ({...props}) => {
    const [open, setOPen] = useState(false);
    const toggle = () => {
        setOPen(!open);
    };
    const contentRef = useRef();
    return (
        <div>
            <button className={cl.toggleButton} onClick={() => toggle()}>
                {props.label}
            </button>
                <div className={cl.contentParent}
                    ref={contentRef}
                    style={open ? { height: contentRef.current.scrollHeight + "px" } : { height: "0px" }}
                >
                    <div className={cl.content}>{props.children}</div>
                </div>
        </div>
    );
};

export default ColapseElem;