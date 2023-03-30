import React,{useState, useCallback} from "react";
import sortProcess from "../../utils/sort";
import CommentEditContainer from "../../containers/chat/CommentEditContainer";
import FavoritContainer from '../../containers/favorit/FavoritContainer';

import styled from "styled-components";

import useDateHook from "../../hooks/useDateHook";


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

function CommentArea({props, depth}:any) {
    // console.log(props)
    const [commentToggle, setCommentToggle] = useState({
        state : false,
        _id : ''
    });

    function SetDate (timestamp:any) {
        return useDateHook(timestamp);
    }

    return (
        props.map((comment:any, index:number)=> {
            // console.log(comment)
            return (
                <li key={index} style={{padding : "0 16px"}}>
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

                    <div className='emotion__wrap'>
                        <FavoritContainer 
                            post_id={comment._id}
                            post_write_user={comment.userId}
                        />
                    </div>
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
    depth : number
}

function CommentComment({props, sortState, toggleChange, _id,writer_id, commentToggle}:CommentProps) {
    return (
        // commentToggle._id === `comment_${_id}`
        // commentToggle.state
        // <CommentWrap id={`comment_${_id}`} matched={true} state={true}>
        <CommentWrap id={`comment_${_id}`} matched={commentToggle._id === `comment_${_id}`} state={commentToggle.state}>
            
            <div style={{display:"flex", justifyContent : "space-between", paddingRight : "16px"}}>
                <h3>Comment Comment <span className="comment-count__badge">{props.length}</span></h3>
                <button type="button" onClick={toggleChange} >{sortState== "ASC" ? "올림차순" : "내림차순"}</button>
            </div>
            <CommentEditContainer 
                _id={_id}
                writer_id={writer_id}
            />
            <ul style={{padding : 0}}>
                {
                    <CommentArea 
                    props={props}/>
                }
            </ul>
        </CommentWrap>
    )
}

export default CommentComment