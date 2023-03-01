import React from 'react';
import request from '../../utils/axios';

import CommentContainer from '../../containers/chat/CommentContainer';


function Chat({chatProps, chatCategory, title}:any) {
    const chatCategoryName = chatCategory;
    
    return (
        <>
            <h2>chat category name = {title}</h2>
            <ul>
                {
                    chatProps.map((ele:any, index:any)=> {
                        console.log(ele)
                        return (
                            <li key={`asd_${index}`}>
                                <p>포스트 넘버 : {ele.post_no}</p>
                                <p>포스트 제목 : {ele.post_title}</p>
                                <p>포스트 내용 :  {ele.post_desc}</p>
                                <hr />

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