import React, { useEffect, useState } from 'react';
import request from '../../utils/axios';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import {getListByCategory} from '../../modules/chat';

import Chat from '../../components/chat/Chat';

function ChatContainer() {
    let {chatcategory} = useParams();

    const [getChatProps, setGetChatProps] = useState();
    const [title, setTitle] = useState('');
    const [post_no, setPost_no] = useState(0);

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getListByCategory(Number(chatcategory)))
        .then((res:any)=> {
            // console.log(res)
            setGetChatProps(res.payload.chatprops)
        });


        //게시판 이름 요청
        request("post","/api/chat/get/category", {class_no : chatcategory})
        .then((res:any)=> {
            console.log('chat container -->',res.result)
            setTitle(res.result.category_name)
            setPost_no(res.result.post_no)
        })

    },[])

    return getChatProps  ? 
    (
            <Chat 
                chatCategory = {chatcategory}
                chatProps={getChatProps}
                title={title}
                post_no={post_no}
            />
    ) : (<>loading...</>)
    
}

export default ChatContainer