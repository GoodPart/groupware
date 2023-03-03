import React,{useState} from "react";
import sortProcess from "../../utils/sort";

function CommentArea({props}:any) {
    console.log('--->', props)
    return (
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

            return (
                <li key={index}>
                   <span>{comment.userId} - {comment.post_comment_desc}</span> - <span>{getTimeSet(comment.post_comment_create_date)}</span>
                </li>
            )
        })
    )
}

type CommentProps = {
    toggleChange : ()=> void,
    props : any,
    sortState : string,
}

function Comment({props, sortState, toggleChange}:CommentProps) {

    return (
        <>
        <h3>댓글 영역 입니다. - {props.length} </h3>
        <div><button type="button" onClick={toggleChange} >정렬{sortState}</button></div>
        <ul>
            {
                <CommentArea 
                props={props} />
            }
        </ul>
        </>
    )
}

export default Comment