import React, { useEffect } from 'react'
import ReactTimeAgo from 'react-time-ago'
import { useTimeAgo } from 'react-time-ago'


type CreatedAtDisplayProps = {
    createdAt: string;
}

function CreatedAtDisplay ({createdAt}: CreatedAtDisplayProps) {

    const date = new Date(createdAt);

    useEffect(() => {
        console.log(JSON.stringify(date))
    }, [createdAt])

    return (
        <div className='text-(--twitter-text)'>
        <ReactTimeAgo date={date} timeStyle={"twitter"}/>
        </div>
    )

}

export default CreatedAtDisplay;