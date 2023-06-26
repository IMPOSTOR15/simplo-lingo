import { useRef, useState } from 'react';
import cl from './/DNDArea.module.css'

const DNDArea = ({ id, handleDrop, isQestionArea, text, isAlreadyUsed }) => {

    let selectedBlockId = null;

    const dragStart = e => {
        const target = e.target;
        if (e.dataTransfer) {
            e.dataTransfer.setData('block_id', target.id);
        }
        selectedBlockId = target.id;
    };

    const dragOver = e => {
        e.preventDefault();
        if (e.dataTransfer) {
            if (!isQestionArea) {
                e.dataTransfer.effectAllowed = 'none';
                e.dataTransfer.dropEffect = 'none';
            } else {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.dropEffect = 'move';
            }
        }
    };

    const dragEnter = e => {
        e.preventDefault();
    };

    const dragLeave = e => {
        e.preventDefault();
    };

    const drop = e => {
        e.preventDefault();
        
        let block_id = selectedBlockId;
        if (e.dataTransfer) {
            block_id = e.dataTransfer.getData('block_id');
        }
        handleDrop(block_id, id);
    }
    const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });

    const elementRef = useRef();

    const touchStart = e => {
        console.log(isQestionArea);
        if (isQestionArea) {
            return;
        }
        setTouchPosition({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        });
    };

    const touchMove = e => {
        if (elementRef.current && !isQestionArea && !isAlreadyUsed) {
            elementRef.current.style.left = `${e.touches[0].clientX - touchPosition.x}px`;
            elementRef.current.style.top = `${e.touches[0].clientY - touchPosition.y}px`;
        }
    };

    const touchEnd = e => {
        e.preventDefault();
    
        if (elementRef.current) {
            elementRef.current.style.left = "0px";
            elementRef.current.style.top = "0px";
        }
        
        if (isQestionArea) {
            return;
        }
    
        const touchPoint = e.changedTouches[0];
        const dropTarget = document.elementFromPoint(touchPoint.clientX, touchPoint.clientY);

        console.log("touchPoint.clientY", touchPoint.clientY);
        console.log("touchPoint.clientX", touchPoint.clientX);
        console.log("dropTarget", dropTarget);
    
        if (dropTarget && dropTarget.id) {
            handleDrop(id, dropTarget.id);
        }
    };
    return (
        <div
            id={id}
            draggable={!isQestionArea && !isAlreadyUsed}
            onDragStart={dragStart}
            onDragEnter={dragEnter}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            onDrop={drop}
            className={`${cl.areaWrapper} ${isAlreadyUsed ? cl.isUsed : ''} ${!isQestionArea && !isAlreadyUsed ? cl.canGrab : ''}`}
            ref={elementRef}
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
            style={{ position: "relative" }}
        >
            {text}
        </div>
    )
}

export default DNDArea;