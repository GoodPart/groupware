import React,{useState} from "react";
import sortProcess from "../../utils/sort";
import CommentEditContainer from "../../containers/chat/CommentEditContainer";
import styled from "styled-components";


const CommentWrap = styled.div<{matched:boolean,state:boolean}>`
    background-color: #555;
    overflow : hidden;
    height: ${props=> props.matched && props.state ? "auto" : 0};
`

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
    _id : string,
    writer_id : string
    commentToggle:any
}

function Comment({props, sortState, toggleChange, _id,writer_id, commentToggle}:CommentProps) {
    console.log(commentToggle._id === _id && commentToggle.state)
    return (
        // commentToggle._id === `comment_${_id}`
        // commentToggle.state
        <CommentWrap id={`comment_${_id}`} matched={commentToggle._id} state={commentToggle.state} >
            <h3>댓글 ({props.length}) <button type="button" onClick={toggleChange} >정렬{sortState}</button></h3>
            <CommentEditContainer 
                _id={_id}
                writer_id={writer_id}
            />
            <ul>
                {
                    <CommentArea 
                    props={props} />
                }
            </ul>
        </CommentWrap>
    )
}

export default Comment