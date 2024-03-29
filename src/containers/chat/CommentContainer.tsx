import React, {useState, useEffect} from "react";
import request from "../../utils/axios";




import Comment from "../../components/chat/Comment";

function CommentContainer({chatProps, commentToggle, depth}:any) {
    // console.log(chatProps)
    const post_id = chatProps._id;
    const writer_id = chatProps.userId;
    const [getComment, setGetComment] = useState('');
    const [sortState,setSortState] = useState('ASC'); // 0 ASC

    useEffect(()=> {
        getCommentProps(sortState);
    }, [])

    const getCommentProps = (type:string) => {
        return request("post","/api/chat/get/comment",{_id : post_id})
        .then((res)=> {
            if(type =='DESC') {
                setGetComment(
                    res.find.sort((a:any,b:any) => +new Date(b.post_comment_create_date) - +new Date(a.post_comment_create_date))
                )
                setSortState(type)
            }else {
                // ASC
                setGetComment(
                    res.find.sort((a:any,b:any) => +new Date(a.post_comment_create_date) - +new Date(b.post_comment_create_date))
                )
                setSortState(type)
            }

        })
    }

    const toggleChange =() => {
        if(sortState == 'ASC') {
            getCommentProps('DESC')
        }else {
            getCommentProps('ASC')
        }
    }

    return getComment ? (
        <Comment
            chatProps={chatProps}
            commentProps={getComment}
            sortState={sortState}
            toggleChange={toggleChange}
            post_id={post_id}
            writer_id={writer_id}
            commentToggle={commentToggle}
            depth={depth+1}
            getCommentProps={getCommentProps}
         />
    ) : ( <></>)
}

export default CommentContainer