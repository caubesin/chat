import React, { useState, useEffect } from 'react';

const Time = (props) => {
    const diffDays = (date, otherDate) => {
        if(date - otherDate < 10*1000) {
            return 'vài giây trước';
        }
        else if(date - otherDate < 60*1000 && date - otherDate >= 10*1000) {
            const seconds = Math.abs(Math.round(parseInt(Math.abs(otherDate.getTime() - date.getTime()) / (1000) % 60)));
            return `${seconds.toString()} giây trước`
        }
        else if(date - otherDate >= 60*1000 && date - otherDate < 3600*1000) {
            const minutes = Math.abs(parseInt(Math.abs(otherDate.getTime() - date.getTime()) / (1000 * 60) % 60));
            return `${minutes.toString()} phút trước`;
        }
        else if(date - otherDate < 3600*24*1000) {
            const hours = Math.abs(parseInt(Math.abs(otherDate - date) / (1000 * 60 * 60) % 24));
            return `${hours.toString()} giờ trước`;
        }
        else if(date - otherDate >= 3600*24*1000) {
            const days = Math.abs(Math.round(parseInt((otherDate - date) / (1000 * 60 * 60 * 24))));
            return `${days.toString()} ngày trước`;
        }
    };
    const [reLoad, setReLoad] = useState(true);
    useEffect(() => {
        setInterval(() => {
            setReLoad(!reLoad);
        },60*1000)
    })
    return(
        <>
            {diffDays(new Date(), new Date(props.data))}
        </>
    )
}

export default Time;