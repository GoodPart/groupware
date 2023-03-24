import React from 'react'
import styled from 'styled-components';


import useDateHook from '../../hooks/useDateHook';

import FavoritContainer from '../../containers/favorit/FavoritContainer';
import CommentBadgeContainer from '../../containers/comment/CommentBadgeContainer';
import CommentContainer
 from '../../containers/chat/CommentContainer';
const ListWrap = styled.div`
    /* background-color: #f1f1f1;
    padding: 16px; */
    background-color: #fff;
    list-style: none;
    padding: 32px;
    margin-bottom: 16px;
    box-shadow: 4px 4px 10px 0px rgba(0,0,0,0.1);
    border-radius: 10px;
`

export default function PostView({post}:any) {
    function SetDate (timestamp:any) {
        return useDateHook(timestamp);
    }
    const thumb = post.userId.slice(0,1)
    // console.log(post)
    return (
        <ListWrap>
            <div className='chat-item'>
                <>{post._id}</>
                <div className="chat-item__header" style={{display : 'flex', alignItems : 'center'}}>
                    <div className="header__thumbnail"
                        style={{position : "relative",width : '40px', height : '40px', borderRadius : "25px", backgroundColor : "coral" , marginRight : "8px"}}
                    ><span style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", textTransform:"uppercase", fontSize:"24px", fontWeight:"bolder"}}>{thumb}</span></div>

                    <div className="header__info" style={{display : "flex", flexDirection :"column", justifyContent: "space-between"}}>
                        <div className="info__user-name" style={{fontSize : "14px",fontWeight : "bold"}}>{post.userId}</div>
                        <div className="info_create-at" style={{fontSize : "10px", fontWeight : "bold", color : "#bbb"}}>{SetDate(post.post_create_date)}</div>
                    </div>
                    <div>
                        {/* (...) 아이콘 추가 */}
                    </div>
                </div>
                <div className="chat-item__desc" style={{backgroundColor:"#f1f1f1", borderRadius:"10px", padding : "16px", marginTop:"24px", fontSize:"14px",color:"#444"}}>
                    <textarea value={post.post_desc} rows={1} readOnly style={{display:'inline-table',fontFamily: 'Sono' ,outline:"none",border:"none",resize:"none", backgroundColor:"transparent", width:"100%", height:"auto", overflowY:"hidden"}}>
                    </textarea>
                </div>
                <div className="chat-item__emotions"></div>
            </div>
            <div style={{display : "flex", margin: "12px 0 0"}}>
                <FavoritContainer 
                    post_id={post._id}
                />
                {/* <CommentBadgeContainer
                    post_id={post._id}
                    onCommentToggle={onCommentToggle}
                    commentToggle={commentToggle}

                /> */}
            </div>
            
            <CommentContainer
                chatProps={post}
                commentToggle={{
                    _id : post._id,
                    state : true
                }}
                />
        </ListWrap>
    )
}