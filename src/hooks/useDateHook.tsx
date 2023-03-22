import {useState, useCallback} from 'react';

function useDateHook(timestamp:any) {
    const today = new Date();
    const thisDay = new Date(timestamp);

    const diff = (+today - +thisDay) / 1000;

    const times = [
        { name: 'years', milliSeconds: 60 * 60 * 24 * 365 },
        { name: 'monthes', milliSeconds: 60 * 60 * 24 * 30 },
        { name: 'days', milliSeconds: 60 * 60 * 24 },
        { name: 'hours', milliSeconds: 60 * 60 },
        { name: 'minutes', milliSeconds: 60 },
    ];
    
    for (const value of times) {
        const betweenTime = Math.floor(diff / value.milliSeconds);

        if (betweenTime > 0)  {
            return `${betweenTime} ${value.name} ago`;
        }
    }

    return 'Now';
}

export default useDateHook;