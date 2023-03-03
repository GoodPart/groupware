import React,{useState} from "react";
import sortProcess from "../../utils/sort";
import CommentEditContainer from "../../containers/chat/CommentEditContainer";

function CommentArea({props}:any) {
    // console.log('--->', props)
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
    _id : string
}

function Comment({props, sortState, toggleChange, _id}:CommentProps) {

    return (
        <div style={{backgroundColor: '#555'}}>
            <h3>댓글 ({props.length}) <button type="button" onClick={toggleChange} >정렬{sortState}</button></h3>
            <CommentEditContainer 
                _id={_id}
            />
            <ul>
                {
                    <CommentArea 
                    props={props} />
                }
            </ul>
        </div>
    )
}

export default Comment