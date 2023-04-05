import React, { useEffect } from 'react';
import styled from 'styled-components';


import CommentContainer from '../../containers/chat/CommentContainer';
import ChatEditContainer from '../../containers/chat/ChatEditContainer';

import useDateHook from '../../hooks/useDateHook';


import FavoritContainer from '../../containers/favorit/FavoritContainer';
import CommentBadgeContainer from '../../containers/comment/CommentBadgeContainer';

const Page__title = styled.h2`
    padding: 16px;
    font-size : 20px;
    color : #48484A;
    background-color: #fff;
    border-radius: 6px;
    margin : 12px 0;
`

const ListWrap = styled.ul`
    background-color: #E5E7EB;
    margin : 0;
    padding: 16px 0;

    li {
        opacity : 0;
        background-color: #fff;
        list-style: none;
        padding: 16px;
        margin-bottom: 16px;
        border-radius: 6px;
        transform: scale(.9);
        animation-name: show;
        animation-duration: .4s;
        animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        animation-fill-mode: forwards;
    }

    

    .emotion__wrap {
        display: flex;
        margin: 12px 0 0 12px;
    }
    > li {
        /* border: 3px solid blue; */
    }
    li ul {
        /* border: 3px solid green; */
    }

    li ul li ul {
        /* border : 3px solid red */
    }
   
   @keyframes show {
    0% {
        opacity : 0;
        transform: scale(.9);
    }
    /* 30% {
        opacity : .8;
        transform: scale(.8);
    } */
    100% {
        opacity : 1;
        transform: scale(1);

    }
   }
`

function Chat({chatProps, chatCategory, title, post_no, onCommentToggle, commentToggle}:any) {

    function SetDate (timestamp:any) {
        return useDateHook(timestamp);
    }
    useEffect(()=> {
        // console.log(chatProps)
    }, [])
    return (
        <>
            <Page__title className='page__title'>{title}</Page__title>
            <ChatEditContainer
                category_no={chatCategory}
                chatProps={chatProps}
                post_no={post_no}
             />
            <ListWrap>
                {
                    chatProps.map((ele:any, index:any)=> {
                        return (
                            <li key={`chat_${index}`} 
                                style={index%3 === 0 ? {animationDelay : "0"} : {animationDelay : `.${index%3}s`}}
                                >
                                <div className='chat-item'>
                                    {/* {ele._id} */}
                                    <div className="chat-item__header" style={{display : 'flex', alignItems : 'center'}}>
                                        <div className="header__thumbnail"
                                            style={{position : "relative",width : '40px', height : '40px', borderRadius : "25px", backgroundColor : "#0F9485" , marginRight : "8px", marginLeft : "8px"}}
                                        ><span style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", textTransform:"uppercase", fontSize:"24px", fontWeight:"bolder", color : "#E5E7EB"}}>{ele.userId.slice(0,1)}</span></div>

                                        <div className="header__info" style={{display : "flex", flexDirection :"column", justifyContent: "space-between"}}>
                                            <div className="info__user-name" style={{fontSize : "14px",fontWeight : "bold", color: "#48484A"}}>{ele.userId}</div>
                                            <div className="info_create-at" style={{fontSize : "10px", color : "#bbb"}}>{SetDate(ele.post_create_date)}</div>
                                        </div>
                                        <div>
                                            {/* (...) 아이콘 추가 */}
                                        </div>
                                    </div>
                                    <div className="chat-item__desc" style={{backgroundColor:"#E5E7EB", borderRadius:"6px", padding : "16px", marginTop:"12px", fontSize:"14px",color:"#48484A"}}>
                                       <textarea value={ele.post_desc} rows={1} readOnly style={{display:'inline-table',fontFamily: 'Sono' ,outline:"none",border:"none",resize:"none", backgroundColor:"transparent", width:"100%", height:"auto", overflowY:"hidden", color : "#48484A"}}>
                                       </textarea>
                                    </div>
                                    <div className="chat-item__emotions"></div>
                                </div>
                             
                                <div className='emotion__wrap'>
                                    <FavoritContainer 
                                        post_id={ele._id}
                                        post_write_user={ele.userId}
                                    />
                                    <CommentBadgeContainer
                                        post_id={ele._id}
                                        onCommentToggle={onCommentToggle}
                                        commentToggle={commentToggle}
                                        type="comment"
                                    />
                                </div>

                                {
                                    commentToggle.state && `${commentToggle._id}` === `comment_${ele._id}` ? 
                                    <CommentContainer
                                        chatProps={ele}
                                        commentToggle={commentToggle}
                                        depth={0}
                                    /> : <></>
                                }
                                
                                

                            </li>
                        )
                        
                    })
                }
            </ListWrap>
        </>
    )
}

export default Chat