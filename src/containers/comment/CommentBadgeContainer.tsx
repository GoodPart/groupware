import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

import { faComment as solidfaComment } from "@fortawesome/free-solid-svg-icons";
import { faComment as regularfaComment } from "@fortawesome/free-regular-svg-icons";
import Icon from '../../modules/icon/Icon';

import request from '../../utils/axios';

const CommentWrap = styled.div`
    input {
        display : none;
    };
    input + label {
        cursor : pointer
    };
    input + label span {
        font-size : 16px;
        font-weight : normal;
        color : #777;
        margin : 0 8px;
    };
`;


export default function CommentBadgeContainer({post_id, onCommentToggle, commentToggle}:any) {
    const [commentProps, setCommentProps] = useState(0);
    console.log(post_id)
    useEffect(()=> {
        request("post", "/api/chat/get/comment", {_id: post_id})
        .then((res)=> {
            console.log(res)
            setCommentProps(res.find.length)
        })
    
    }, [])

    return (
        <CommentWrap>
            <input id={`comment_${post_id}`} type="checkbox" onChange={(e)=> onCommentToggle(e, `comment_${post_id}`)} checked={commentToggle.state}/>
            <label htmlFor={`comment_${post_id}`}>
                <Icon
                    icon={commentToggle._id === `comment_${post_id}` && commentToggle.state ? solidfaComment : regularfaComment}
                    style={{color: "#666"}} 
                />
                <span>{commentProps}</span>
            </label>
        </CommentWrap>
        
    )
}
