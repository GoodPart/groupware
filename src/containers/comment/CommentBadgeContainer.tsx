import React, {useState, useEffect} from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment as solidfaComment } from "@fortawesome/free-solid-svg-icons";
import { faComment as regularfaComment } from "@fortawesome/free-regular-svg-icons";

import request from '../../utils/axios';


export default function CommentBadgeContainer({post_id, onCommentToggle, commentToggle}:any) {
    const [commentProps, setCommentProps] = useState(0);
    useEffect(()=> {
        request("post", "/api/chat/get/comment", {_id: post_id})
        .then((res)=> {
            setCommentProps(res.find.length)
        })
    
    }, [])


    // if(!commentProps.success)


    return (
        <p>
            <input id={`comment_${post_id}`} type="checkbox" onChange={(e)=> onCommentToggle(e)} checked={commentToggle} style={{display:"none"}}/>
            <label htmlFor={`comment_${post_id}`} style={{cursor:"pointer"}}>
                <FontAwesomeIcon
                    icon={regularfaComment}
                    style={{color: "#888"}} 
                />
                <span style={{fontSize : "16px", fontWeight:"normal", color:"#777", margin:"0 8px"}}>{commentProps}</span>
            </label>
        </p>
        
    )
}
