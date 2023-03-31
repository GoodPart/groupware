import React,{useState, useCallback} from "react";
import sortProcess from "../../utils/sort";
import CommentContainer from '../../containers/chat/CommentContainer';
import CommentEditContainer from "../../containers/chat/CommentEditContainer";
import FavoritContainer from '../../containers/favorit/FavoritContainer';
import CommentBadgeContainer from '../../containers/comment/CommentBadgeContainer';


import RecommentContainer from "../../containers/chat/RecomentContainer";
import styled from "styled-components";

import useDateHook from "../../hooks/useDateHook";

import Icon from "../../modules/icon/Icon";



const CommentWrap = styled.div<{matched:boolean,state:boolean}>`
    background-color: #fff;
    overflow : hidden;
    height: ${props=> props.matched && props.state ? "auto" : 0};

    h3 {
        margin : 8px 0;
        font-size: 16px;
        font-weight : 600;
        color : #48484A;
    }

    .comment-count__badge {
        padding: 0 6px;
        font-size : 10px;
        border-radius: 25px;
        background-color: #838383;
        color : #fff;
    
    }
`

const ThumbNail = styled.div`
  align-self: center;
  position : relative;
  margin: 8px;
  width : 30px;
  height : 30px;
  border-radius : 25px;
  background-color : #0F9485;
`

function CommentArea({commentProps, depth}:any) {
    // console.log(props)
    const [commentToggle, setCommentToggle] = useState({
        state : false,
        _id : ''
    });

    function SetDate (timestamp:any) {
        return useDateHook(timestamp);
    }

    const onCommentToggle = useCallback((e:any, _id:string)=> {
            setCommentToggle({
                state : e.currentTarget.checked,
                _id : _id
            })
        
    }, [commentToggle]) 
    return (
        commentProps.map((comment:any, index:number)=> {
            // console.log('data-type1 ->',comment)
            return (
                <li key={index} style={{padding : "0 16px"}}>
                    포스트 id - {comment.post_comment_code}<br/>
                    코멘트 id- {comment._id}
                    <div style={{display:"flex"}}>
                        <ThumbNail>
                            <span style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", textTransform:"uppercase", fontSize:"16px", fontWeight:"bolder", color: "#E5E7EB"}}>{comment.userId.slice(0,1)}</span>
                        </ThumbNail>
                        <div className="header__info" style={{display : "flex", flexDirection :"column", justifyContent: "center"}}>
                            <div className="info__user-name" style={{fontSize : "14px",fontWeight : "bold", color: "#48484A"}}>{comment.userId}</div>
                            <div className="info_create-at" style={{fontSize : "10px", color : "#bbb"}}>{SetDate(comment.post_comment_create_date)}</div>
                        </div>
                    </div>
                    <div style={{backgroundColor:"",borderRadius:"6px", padding : "16px", marginTop:"12px", fontSize:"14px",color:"#48484A"}}>
                        <textarea value={comment.post_comment_desc} rows={1} readOnly style={{display:'inline-table',fontFamily: 'Sono' ,outline:"none",border:"none",resize:"none", backgroundColor:"transparent", width:"100%", height:"auto", overflowY:"hidden", color : "#48484A"}}></textarea>
                    </div>

                    <div className='emotion__wrap' data-type='1'>
                        <FavoritContainer 
                            post_id={comment._id}
                            post_write_user={comment.userId}
                        />
                    </div>
                 
                    <RecommentContainer
                        commentProps={comment}
                        commentToggle={commentToggle}
                    /> 
                </li>
            )
        })
    )
}

type CommentProps = {
    chatProps:any,
    toggleChange : ()=> void,
    commentProps : any,
    sortState : string,
    post_id : string,
    writer_id : string
    commentToggle:any
    depth : number
}

function Comment({chatProps,commentProps, sortState, toggleChange, post_id,writer_id, commentToggle, depth}:CommentProps) {
    // console.log('-->',chatProps)
    /*
        props : 댓글 정보 
            post_comment_code
            post_comment_create_date
            userId -> 댓글 작성자
            ...
    */
    return (
        // <CommentWrap id={`comment_${_id}`} matched={true} state={true}>
        <CommentWrap id={`comment_${post_id}`} matched={commentToggle._id === `comment_${post_id}`} state={commentToggle.state}>
            <div style={{display:"flex", justifyContent : "space-between", paddingRight : "16px"}}>
                <h3>{depth == 1 ? "Comment" : "Comment to Comment"} <span className="comment-count__badge">{commentProps.length}</span></h3>
                <button type="button" onClick={toggleChange} >{sortState== "ASC" ? "올림차순" : "내림차순"}</button>
            </div>
            <CommentEditContainer 
                post_id={chatProps}
                type={depth === 1 ? "comment" : "recoment"}
            />

            <ul style={{padding : 0}}>
                {
                    <CommentArea
                        commentProps={commentProps}
                        depth={depth} />
                }
            </ul>
        </CommentWrap>
    )
}

export default Comment