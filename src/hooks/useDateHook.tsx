import {useState, useCallback} from 'react';

function useDateHook(timestamp:any) {
    const today = new Date();
    const thisDay = new Date(timestamp);

    const diff = (+today - +thisDay) / 1000;

    const times = [
        { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
        { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
        { name: '일', milliSeconds: 60 * 60 * 24 },
        { name: '시간', milliSeconds: 60 * 60 },
        { name: '분', milliSeconds: 60 },
    ];
    
    for (const value of times) {
        const betweenTime = Math.floor(diff / value.milliSeconds);

        if (betweenTime > 0)  {
            return `${betweenTime}${value.name} 전`;
        }
    }

    return '방금 전';
}

export default useDateHook;