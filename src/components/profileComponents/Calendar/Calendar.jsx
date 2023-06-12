import React, { useContext, useEffect, useState } from "react";
import cl from './Calendar.module.css'
import { getUserActivity } from "../../../http/activityApi";
import { Context } from "../../..";


function Calendar({ checkedDates }) {
    const {user} = useContext(Context)
    
    const [date, setDate] = useState(new Date());
    // console.log(date.getMonth());
    const [userActivity, setUserActivity] = useState([])

    const [activityDaysIndexes, setActivityDaysIndexes] = useState([])

    const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const weeksInMonth = Math.ceil((daysInMonth + new Date(date.getFullYear(), date.getMonth(), 1).getDay()) / 7);
    const startDayOfWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    useEffect(() => {
        getUserActivity(user.user.id, date.getMonth)
        .then(data => {
            setUserActivity(data);
            setActivityDaysIndexes(userActivity.map(obj => {return new Date(obj.date).getDate()}))
        })
    }, [])
    let weeks = [];
    for (let i = 0; i < weeksInMonth; i++) {
        let days = [];
        for (let j = 0; j < 7; j++) {
            let dayIndex = i * 7 + j - startDayOfWeek + 1;
            if (dayIndex > 0 && dayIndex <= daysInMonth) {
                days.push(
                    <td
                        className={cl.dayTd}
                        key={j}
                        style={{ backgroundColor: activityDaysIndexes.includes(dayIndex) ? "rgba(0, 200, 0, 0.5)" : "transparent" }}
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
}

export default Calendar;