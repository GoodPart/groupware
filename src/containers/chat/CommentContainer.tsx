import React, {useState, useEffect} from "react";
import request from "../../utils/axios";


import Comment from "../../components/chat/Comment";

function CommentContainer({chatProps}:any) {
    const [getComment, setGetComment] = useState('');
    // console.log('comment ->',chatProps)
    useEffect(()=> {
        request("post","/api/chat/get/comment",{_id : chatProps._id})
        .then((res)=> {
            // console.log("get comment", res.find)
            setGetComment(res.find)
        })
    }, [])

    return getComment ? (
        <Comment
            props={getComment}
         />
    ) : ( <>loading...</>)
}

export default CommentContainer