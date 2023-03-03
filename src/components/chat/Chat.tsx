import React from 'react';
import request from '../../utils/axios';

import CommentContainer from '../../containers/chat/CommentContainer';
import ChatEditContainer from '../../containers/chat/ChatEditContainer';

function Chat({chatProps, chatCategory, title}:any) {
    console.log(chatProps)
    // console.log(chatCategory) //카테고리 넘버
    
    return (
        <>
            <h2>chat category name = {title}</h2>
            <ChatEditContainer
                category_no={chatCategory}
                chatProps={chatProps}
             />
            <ul>
                {
                    chatProps.map((ele:any, index:any)=> {
                        return (
                            <li key={`asd_${index}`}>
                                <p>포스트 넘버 : {ele.post_no}</p>
                                <p>포스트 제목 : {ele.post_title}</p>
                                <p>포스트 내용 :  {ele.post_desc}</p>
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