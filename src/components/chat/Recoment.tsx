import React,{useState, useCallback} from "react";
import sortProcess from "../../utils/sort";
import CommentEditContainer from "../../containers/chat/CommentEditContainer";
import FavoritContainer from '../../containers/favorit/FavoritContainer';

import styled from "styled-components";

import useDateHook from "../../hooks/useDateHook";

const ThumbNail = styled.div`
  align-self: center;
  position : relative;
  margin: 8px;
  width : 30px;
  height : 30px;
  border-radius : 25px;
  background-color : #0F9485;
`

const ItemList = styled.li`
    position: relative;
    padding : 0 !important;
    
    &:last-child {
        padding-bottom: 24px !important;
        margin: 0 !important;
    }
    &:last-child:after {
        content: '';
        position: absolute;
        bottom: 0px;
        left : 50%;
        transform: translateX(-50%);
        width : 40%;
        height : 2px;
        border-top: 2px solid #f1f1f1;
        border-bottom: 2px solid #f1f1f1;
    }
`

function CommentArea({props}:any) {
    // console.log(props)

    function SetDate (timestamp:any) {
        return useDateHook(timestamp);
    }

    return (
        props.map((comment:any, index:number)=> {
            return (
                <ItemList key={index} >
                    <div style={{display:"flex"}}>
                        <ThumbNail>
                            <span style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", textTransform:"uppercase", fontSize:"16px", fontWeight:"bolder", color: "#E5E7EB"}}>{comment.from.slice(0,1)}</span>
                        </ThumbNail>
                        <div className="header__info" style={{display : "flex", flexDirection :"column", justifyContent: "center"}}>
                            <div className="info__user-name" style={{fontSize : "14px",fontWeight : "bold", color: "#48484A"}}>{comment.from}</div>
                            <div className="info_create-at" style={{fontSize : "10px", color : "#bbb"}}>{SetDate(comment.post_comment_create_date)}</div>
                        </div>
                    </div>
                    <div style={{backgroundColor:"#E5E7EB",borderRadius:"6px", padding : "16px", marginTop:"12px", fontSize:"14px",color:"#48484A"}}>
                        <textarea value={comment.re_comment_desc} rows={1} readOnly style={{display:'inline-table',fontFamily: 'Sono' ,outline:"none",border:"none",resize:"none", backgroundColor:"transparent", width:"100%", height:"auto", overflowY:"hidden", color : "#48484A"}}></textarea>
                    </div>

                    <div className='emotion__wrap' data-type="2">
                        <FavoritContainer 
                            post_id={comment._id}
                            post_write_user={comment.from}
                        />
                    </div>
                </ItemList>
            )
        })
    )
}


const CommentWrap = styled.ul`
    position: relative;
    padding : 8px 16px 16px;
    margin : 0px 8px;
`
function Recoment(
    {reComent, originProps, sortState, toggleChange, commentToggle, getCommentProps}:any
    ) {
    return (
        <>
            <CommentEditContainer
                post_id={originProps}
                type="recoment"
                getCommentProps={getCommentProps}
            />

            <CommentWrap>
                <CommentArea 
                    props={reComent}
                />
            </CommentWrap>
        </>
    
    )
}

export default Recoment