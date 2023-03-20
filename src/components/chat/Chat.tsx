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
            <h2>chat category name = {title}</h2>
            <hr />
            <ChatEditContainer
                category_no={chatCategory}
                chatProps={chatProps}
                post_no={post_no}
             />
            <ul>
                {
                    chatProps.map((ele:any, index:any)=> {
                        // console.log(ele)
                        return (
                            <li key={`asd_${index}`}>
                                <div>(임시) _id : {ele._id}</div>
                                <p>작성자 : {ele.userId}</p>
                                <p>포스팅 시간 : {SetDate(ele.post_create_date)}</p>
                                <p>포스트 넘버 : {ele.post_no}</p>
                                <p>포스트 제목 : {ele.post_title}</p>
                                <p>포스트 내용 :  {ele.post_desc}</p>
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
                                <hr />
                                <CommentContainer
                                    chatProps={ele}
                                 />
                                <hr />

                            </li>
                            
                        )
                    })
                }
            </ul>
        </>
    )
}

export default Chat