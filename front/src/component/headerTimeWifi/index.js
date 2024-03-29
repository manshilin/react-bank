//front/src/component/headerTimeWifi/index.js
import "./index.css"
import React, { useState, useEffect } from "react"
import StatusBarBlack from "../../component/headerTimeWifi/statusbarblack.svg"
import StatusBarWhite from "../../component/headerTimeWifi/statusbarwhite.svg"

const HeaderTimeWifi = ({ color }) => {
    function getCurrentTime() {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    const [time, setTime] = useState(getCurrentTime());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(getCurrentTime());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const StatusBar = color === 'black' ? StatusBarBlack : StatusBarWhite;

    return (
        <div className={`header-time-wifi`}>
            <div className={`header-time-wifi__time header-time-wifi__time--${color}`}>{time}</div>
            <div className={`header-time-wifi__wifi header-time-wifi__wifi--${color}`}>
                <img src={StatusBar} alt="status bar" />
            </div>
        </div>
    );
}

export default HeaderTimeWifi




    



