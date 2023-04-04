import React, {useState, useEffect} from "react";
import request from "../../utils/axios";




import Recoment from "../../components/chat/Recoment";

function RecommentContainer({commentProps, commentToggle}:any) {
    // console.log(commentProps)
    const post_id = commentProps.post_comment_code;
    const writer_id = commentProps.userId;
    const [reComent, setRecoment] = useState('');
    const [sortState,setSortState] = useState('ASC'); // 0 ASC

    useEffect(()=> {
        getCommentProps(sortState);
    }, [])

    const getCommentProps = (type:string) => {
        return request("post","/api/chat/get/recomentby_id",{comment_code : commentProps._id})
        .then((res)=> {
            // console.log("check comment ->", res)
            if(type =='DESC') {
                setRecoment(
                    res.find.sort((a:any,b:any) => +new Date(b.post_comment_create_date) - +new Date(a.post_comment_create_date))
                )
                setSortState(type)
            }else {
                // ASC
                setRecoment(
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

    // return getComment ? (
    return reComent ? (
        <Recoment
            reComent={reComent}
            originProps={commentProps}
            sortState={sortState}
            toggleChange={toggleChange}
            // writer_id={writer_id}
            commentToggle={commentToggle}
            // depth={depth+1}
         />
    ) : ( <></>)
}

export default RecommentContainer