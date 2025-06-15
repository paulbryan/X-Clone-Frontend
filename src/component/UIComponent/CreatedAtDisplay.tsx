import React, { useEffect } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { useTimeAgo } from 'react-time-ago'


type CreatedAtDisplayProps = {
    createdAt: string;
    typeOfCreatedAt: string;
}

function CreatedAtDisplay ({createdAt, typeOfCreatedAt}: CreatedAtDisplayProps) {
   
    const date = createdAt ? parseDate(createdAt) : "";
    const timeAgo = new Date(createdAt);

    function parseDate(toFormat: string): string {

        // console.log("To format: " + toFormat)

        //2025-06-01 20:15:36
        const year = toFormat.slice(0, 4);
        let month = toFormat.slice(5, 7);
        let day = toFormat.slice(8, 10);
    
        // Remove leading zero
        const dayNum = parseInt(day, 10);
    
        const getSuffix = (d: number) => {
            if (d >= 11 && d <= 13) return 'th';
            switch (d % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };
    
        const months = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];
    
        const monthIndex = parseInt(month, 10) - 1;
    
        // console.log("I got you a " + `${dayNum}${getSuffix(dayNum)} ${months[monthIndex]} ${year}`)
        return `${dayNum}${getSuffix(dayNum)} ${months[monthIndex]} ${year}`;
    }

    return (
        <>
            {typeOfCreatedAt == "timeago" ? (
                <div className='text-(--twitter-text)'>
                <ReactTimeAgo date={timeAgo} timeStyle={"twitter"}/>
                </div> 
            ) :  (
                <div className='text-(--twitter-text)'>
                <p>Joined {date}</p>
                </div> 
            )} 
        </>
    )

}

export default CreatedAtDisplay;