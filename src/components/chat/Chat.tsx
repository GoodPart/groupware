import React from 'react';
import request from '../../utils/axios';

import CommentContainer from '../../containers/chat/CommentContainer';
import ChatEditContainer from '../../containers/chat/ChatEditContainer';

function Chat({chatProps, chatCategory, title, post_no}:any) {
    console.log(chatProps)
    // console.log(chatCategory) //카테고리 넘버
    
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
                        function getTimeSet(timestamp:any) {
                            const _timeStamp = new Date(timestamp);
            
                            let getDate = {
                                year : _timeStamp.getFullYear(),
                                month : _timeStamp.getMonth()+1 < 10 ? '0'+ (_timeStamp.getMonth()+1) : _timeStamp.getMonth()+1,
                                day : _timeStamp.getDate() < 10 ? '0' + _timeStamp.getDate() : _timeStamp.getDate(),
                                hour : _timeStamp.getHours() < 10 ? '0' + _timeStamp.getHours() : _timeStamp.getHours(),
                                min : _timeStamp.getMinutes() < 10 ? '0' + _timeStamp.getMinutes() : _timeStamp.getMinutes()
                            }
                            return (
                                <span>{getDate.year}-{getDate.month}-{getDate.day} {getDate.hour}:{getDate.min}</span>
                            )
                        }

                        return (
                            <li key={`asd_${index}`}>
                                <p>포스팅 시간 : {getTimeSet(ele.post_create_date)}</p>
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