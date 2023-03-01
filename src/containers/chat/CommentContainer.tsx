import React, {useState, useEffect} from "react";


import Comment from "../../components/chat/Comment";

function CommentContainer({chatProps}:any) {
    console.log('comment ->',chatProps)
    return (
        <Comment />
    )
}

export default CommentContainer