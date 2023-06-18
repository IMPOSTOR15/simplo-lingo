import React, { useContext, useEffect, useState } from "react";
import cl from './Calendar.module.css'
import { getUserActivity } from "../../../http/activityApi";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import CalendarTooltip from "./CalendarTooltip";
import { useRef } from "react";


const Calendar = observer(({ checkedDates }) => {
    const {user} = useContext(Context)
    
    const [date, setDate] = useState(new Date());
    const [weeks, setWeeks] = useState([])
    const [userActivity, setUserActivity] = useState({})

    const daysOfWeek = [ "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const weeksInMonth = Math.ceil((daysInMonth + new Date(date.getFullYear(), date.getMonth(), 1).getDay()) / 7);
    const startDayOfWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    useEffect(() => {
        fetchActivity()
    }, [])

    let dateRef = useRef();

    const fetchActivity = async () => {
        let userActivityData = await getUserActivity(user.user.id, date.getMonth)
        setUserActivity(userActivityData);
        let activityDays = userActivityData.map(obj => {
            return new Date(obj.date).getDate()
        });
        calculateDates(activityDays, userActivityData)
    }

    const calculateDates = (activityDays, userActivityData) => {

        for (let i = 0; i < weeksInMonth; i++) {
            let days = [];
            for (let j = 0; j < 7; j++) {
                let dayIndex = i * 7 + j - startDayOfWeek + 2;
                if (dayIndex > 0 && dayIndex <= daysInMonth) {
                    days.push(
                            <td
                                key={j}
                                ref={dateRef}
                                className={cl.dayTd}
                                style={{ backgroundColor: activityDays.includes(dayIndex) ? "rgba(0, 200, 0, 0.5)" : "transparent" }}
                            >
                                <CalendarTooltip tooltipText={userActivityData[activityDays.indexOf(dayIndex)]?.total_solved}>
                                    {dayIndex}
                                </CalendarTooltip>
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
                <tr>
                    {daysOfWeek.map((day, index) => (
                        <th scope="row" key={index}>{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>{weeks}</tbody>
        </table>
    );
});

export default Calendar;