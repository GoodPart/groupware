import React from 'react';

import CommentContainer from '../../containers/chat/CommentContainer';
import ChatEditContainer from '../../containers/chat/ChatEditContainer';

import useDateHook from '../../hooks/useDateHook';


import FavoritContainer from '../../containers/favorit/FavoritContainer';


function Chat({chatProps, chatCategory, title, post_no}:any) {
    function SetDate (timestamp:any)  {
        return useDateHook(timestamp);
    }
    return (
        <>
        <hr />
            <h2>chat category name = {title}</h2>
            <ChatEditContainer
                category_no={chatCategory}
                chatProps={chatProps}
                post_no={post_no}
             />
            <ul style={{backgroundColor : "#f1f1f1", padding : "16px"}}>
                {
                    chatProps.map((ele:any, index:any)=> {
                        // console.log(ele)
                        return (
                            <li key={`asd_${index}`} style={{backgroundColor:"#fff", borderRadius:"10px", listStyle: "none", padding : "32px", marginBottom : "16px", boxShadow: "4px 4px 10px 0px rgba(0,0,0,0.1)"}}>
                                <div className='chat-item'>
                                    <div className="chat-item__header" style={{display : 'flex', alignItems : 'center'}}>
                                        <div className="header__thumbnail"
                                            style={{position : "relative",width : '40px', height : '40px', borderRadius : "25px", backgroundColor : "coral" , marginRight : "8px"}}
                                        ><span style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", textTransform:"uppercase", fontSize:"24px", fontWeight:"bolder"}}>{ele.userId.slice(0,1)}</span></div>

                                        <div className="header__info" style={{display : "flex", flexDirection :"column", justifyContent: "space-between"}}>
                                            <div className="info__user-name" style={{fontSize : "14px",fontWeight : "bold"}}>{ele.userId}</div>
                                            <div className="info_create-at" style={{fontSize : "10px", fontWeight : "bold", color : "#bbb"}}>{SetDate(ele.post_create_date)}</div>
                                        </div>
                                        <div>
                                            {/* (...) 아이콘 추가 */}
                                        </div>
                                    </div>
                                    <div className="chat-item__desc" style={{backgroundColor:"#f1f1f1", borderRadius:"10px", padding : "16px", marginTop:"24px", fontSize:"14px",color:"#444"}}>
                                        {/* <p>포스트 제목 : {ele.post_title}</p> */}
                                       <textarea value={ele.post_desc} rows={1} readOnly style={{display:'inline-table',fontFamily: 'Sono' ,outline:"none",border:"none",resize:"none", backgroundColor:"transparent", width:"100%", height:"auto", overflowY:"hidden"}}>
                                       {/* {ele.post_desc} */}
                                       </textarea>
                                    </div>
                                    <div className="chat-item__emotions"></div>
                                </div>

                                
                                {/* <div>(임시) _id : {ele._id}</div> */}
                                
                                {/* <p>포스트 넘버 : {ele.post_no}</p> */}
                                {/* <p>좋아요 : {ele.favorit_count}</p> */}
                                {/*
                                    좋아요 상태
                                    1. auth x, 좋아요 x,o = 좋아요 버튼(체크 전), 카운트 노출
                                    2. auth o, 좋아요 x = 좋아요 버튼(체크 전), 카운트 노출
                                    3. auth o, 좋아요 o = 좋아요 버튼(체크) 카운트 증가
                                */}
                                <FavoritContainer 
                                    // favorit_count={ele.favorit_count}
                                    post_id={ele._id}
                                />
                                {/* <hr /> */}
                                <CommentContainer
                                    chatProps={ele}
                                 />

                            </li>
                            
                        )
                    })
                }
            </ul>
        </>
    )
}

export default Chat