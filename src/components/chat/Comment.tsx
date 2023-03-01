import React from "react";

function Comment({props}:any) {
    console.log(props)
    return (
        <>
        <h3>댓글 영역 입니다.</h3>
        <ul>
            {
                props.map((comment:any, index:number)=> {
                    return (
                        <li key={index}>
                            {comment.post_comment_desc}
                        </li>
                    )
                })
            }
        </ul>
        </>
    )
}

export default Comment