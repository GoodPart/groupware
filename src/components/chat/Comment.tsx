import React from "react";

function Comment({props}:any) {
    console.log(props)
    return (
        <>
        <h3>댓글 영역 입니다.</h3>
        <ul>
            {
                props.map((comment:any, index:number)=> {

                    function getTimeSet(timestamp:any) {
                        const _timeStamp = new Date(timestamp);

                        let getDate = {
                            year : _timeStamp.getFullYear(),
                            month : _timeStamp.getMonth()+1 < 10 ? '0'+ (_timeStamp.getMonth()+1) : _timeStamp.getMonth()+1,
                            day : _timeStamp.getDate() < 10 ? '0' + _timeStamp.getDate() : _timeStamp.getDate(),
                            hour : _timeStamp.getHours() < 10 ? '0' + _timeStamp.getHours() : _timeStamp.getHours(),
                            min : _timeStamp.getMinutes() < 10 ? '0' + _timeStamp.getMinutes() : _timeStamp.getMinutes()
                        }

                        return (
                            <span>{getDate.year}-{getDate.month}-{getDate.day} {getDate.hour}:{getDate.min}</span>
                        )

                    }

                    //년도 월 일 시 분
                    return (
                        <li key={index}>
                           <span>{comment.post_comment_desc}</span> - <span>{getTimeSet(comment.post_comment_create_date)}</span>
                        </li>
                    )
                })
            }
        </ul>
        </>
    )
}

export default Comment