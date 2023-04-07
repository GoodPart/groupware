import React,{useState, useCallback} from "react";
import sortProcess from "../../utils/sort";
import CommentContainer from '../../containers/chat/CommentContainer';
import CommentEditContainer from "../../containers/chat/CommentEditContainer";
import FavoritContainer from '../../containers/favorit/FavoritContainer';
import CommentBadgeContainer from '../../containers/comment/CommentBadgeContainer';


import RecommentContainer from "../../containers/chat/RecomentContainer";
import styled from "styled-components";
import {faSort} from '@fortawesome/free-solid-svg-icons'

import useDateHook from "../../hooks/useDateHook";
import Icon from "../../modules/icon/Icon";

const CommentWrap = styled.div<{matched:boolean,state:boolean}>`
    background-color: transparent;
    overflow : hidden;
    height: ${props=> props.matched && props.state ? "auto" : 0};

    h3 {
        margin : 0;
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
    .btn-wort {
        button {
            cursor: pointer;
            border : none;
            font-size : 14px;
            font-weight : normal;
            color : #777;
            margin : 0;
            background-color: transparent;
        }
        button span {
            margin-right: 4px;
        }
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
    const [reCommentLength, setRecommentLength] = useState()

    function SetDate (timestamp:any) {
        return useDateHook(timestamp);
    }

    const onCommentToggle = useCallback((e:any, _id:string)=> {
        // console.log(e.currentTarget.checked)
            setCommentToggle({
                state : e.currentTarget.checked,
                _id : _id
            })
        
    }, [commentToggle]) 
    return (
        commentProps.map((comment:any, index:number)=> {
            return (
                <li key={index} style={{padding : "0"}}>
                    <div style={{display:"flex"}}>
                        <ThumbNail>
                            <span style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", textTransform:"uppercase", fontSize:"16px", fontWeight:"bolder", color: "#E5E7EB"}}>{comment.userId.slice(0,1)}</span>
                        </ThumbNail>
                        <div className="header__info" style={{display : "flex", flexDirection :"column", justifyContent: "center"}}>
                            <div className="info__user-name" style={{fontSize : "14px",fontWeight : "bold", color: "#48484A"}}>{comment.userId}</div>
                            <div className="info_create-at" style={{fontSize : "10px", color : "#bbb"}}>{SetDate(comment.post_comment_create_date)}</div>
                        </div>
                    </div>
                    <div style={{backgroundColor:"#E5E7EB",borderRadius:"6px", padding : "16px", marginTop:"12px", fontSize:"14px",color:"#48484A"}}>
                        <textarea value={comment.post_comment_desc} rows={1} readOnly style={{display:'inline-table',fontFamily: 'Sono' ,outline:"none",border:"none",resize:"none", backgroundColor:"transparent", width:"100%", height:"auto", overflowY:"hidden", color : "#48484A"}}></textarea>
                    </div>

                    <div className='emotion__wrap' data-type='1'>
                        <FavoritContainer 
                            post_id={comment._id}
                            post_write_user={comment.userId}
                        />
                        <CommentBadgeContainer
                            post_id={comment._id}
                            onCommentToggle={onCommentToggle}
                            commentToggle={commentToggle}
                            type="recomment"
                        />
                        {/* <div>
                            <input id={`comment_${comment._id}`} type="checkbox" onChange={(e)=> onCommentToggle(e, comment._id)}/>
                            <label htmlFor={`comment_${comment._id}`}>답글</label>
                        </div> */}
                    </div>
                 
                 
                     
                        {/* {commentToggle._id `comment_${comment._id}`} */}
                        {
                            commentToggle.state && `${commentToggle._id}` === `comment_${comment._id}` ? 
                            <RecommentContainer
                                commentProps={comment}
                                commentToggle={commentToggle}
                            /> : 
                            <></>
                        }
                        
                 
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
    getCommentProps : any
}

function Comment({chatProps,commentProps, sortState, toggleChange, post_id,writer_id, commentToggle, depth, getCommentProps}:CommentProps) {
    /*
        props : 댓글 정보 
            post_comment_code
            post_comment_create_date
            userId -> 댓글 작성자
            ...
    */
    return (
        <CommentWrap id={`comment_${post_id}`} matched={commentToggle._id === `comment_${post_id}`} state={commentToggle.state}>
            <div style={{display:"flex", justifyContent : "space-between", margin : " 16px 0 0"}}>
                <h3>{depth == 1 ? "Comment" : "Comment to Comment"}
                {/* <span className="comment-count__badge">{commentProps.length}</span> */}
                </h3>
                <div className="btn-wort">
                    <button type="button" onClick={toggleChange} >
                        <span>{sortState== "ASC" ? "Last" : "Latest"}</span>
                        <Icon 
                            icon={faSort}
                            style={{color:"#48484A"}}
                        />
                        </button>
                </div>
            </div>
            <CommentEditContainer 
                post_id={chatProps}
                type={depth === 1 ? "comment" : "recoment"}
                getCommentProps={getCommentProps}
            />

            <ul style={{padding : "0 16px", margin : "12px 0"}}>
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