import React,{useState} from "react";
import sortProcess from "../../utils/sort";
import CommentEditContainer from "../../containers/chat/CommentEditContainer";
import styled from "styled-components";

import useDateHook from "../../hooks/useDateHook";


const CommentWrap = styled.div<{matched:boolean,state:boolean}>`
    background-color: #555;
    overflow : hidden;
    height: ${props=> props.matched && props.state ? "auto" : 0};
`

function CommentArea({props}:any) {
    function SetDate (timestamp:any) {
        return useDateHook(timestamp);
    }
    return (
        props.map((comment:any, index:number)=> {

            return (
                <li key={index}>
                   <span>{comment.userId} - {comment.post_comment_desc}</span> - <span>{SetDate(comment.post_comment_create_date)}</span>
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
    // console.log(commentToggle._id === _id && commentToggle.state)
    console.log(commentToggle._id, _id )
    return (
        // commentToggle._id === `comment_${_id}`
        // commentToggle.state
        <CommentWrap id={`comment_${_id}`} matched={commentToggle._id === `comment_${_id}`} state={commentToggle.state} >
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