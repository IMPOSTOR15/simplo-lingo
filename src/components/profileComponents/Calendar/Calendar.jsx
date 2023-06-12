import React, { useContext, useEffect, useState } from "react";
import cl from './Calendar.module.css'
import { getUserActivity } from "../../../http/activityApi";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";


const Calendar = observer(({ checkedDates }) => {
    const {user} = useContext(Context)
    
    const [date, setDate] = useState(new Date());
    const [weeks, setWeeks] = useState([])
    // console.log(date.getMonth());
    const [userActivity, setUserActivity] = useState([])


    const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const weeksInMonth = Math.ceil((daysInMonth + new Date(date.getFullYear(), date.getMonth(), 1).getDay()) / 7);
    const startDayOfWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    

    useEffect(() => {
        fetchActivity()
    }, [])

    
    const fetchActivity = async () => {
        let userActivityData = await getUserActivity(user.user.id, date.getMonth)
        setUserActivity(userActivityData);

        let activityDays = userActivityData.map(obj => {
            return new Date(obj.date).getDate()
        });
        calculateDates(activityDays)
    }


    const calculateDates = (activityDays) => {
        for (let i = 0; i < weeksInMonth; i++) {
            let days = [];
            for (let j = 0; j < 7; j++) {
                let dayIndex = i * 7 + j - startDayOfWeek + 1;
                if (dayIndex > 0 && dayIndex <= daysInMonth) {
                    days.push(
                        <td
                            className={cl.dayTd}
                            key={j}
                            style={{ backgroundColor: activityDays.includes(dayIndex) ? "rgba(0, 200, 0, 0.5)" : "transparent" }}
                        >
                            {dayIndex}
                        </td>
                    );
                } else {
                    days.push(<td key={j}></td>);
                }
            }
            weeks.push(<tr key={i}>{days}</tr>);
        }
        setWeeks(weeks)
    }
    

    return (
        <table className={cl.calendarTable}>
            <thead >
                <tr className={cl.calendarThead}>
                    {daysOfWeek.map((day, index) => (
                        <th key={index}>{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>{weeks}</tbody>
        </table>
    );
});

export default Calendar;