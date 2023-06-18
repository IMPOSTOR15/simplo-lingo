import React from 'react';
import cl from './CalendarTooltip.module.css'; // предполагая, что вы сохранили CSS в Tooltip.css

const CalendarTooltip = ({ tooltipText, children }) => {
    return (
        <div className={cl.tooltip}>
            <div className={cl.tooltipChildren}>{children}</div>
            { tooltipText &&
                <span className={cl.tooltiptext}>решено: {tooltipText}</span>
            }
            
        </div>
    )
};

export default CalendarTooltip;