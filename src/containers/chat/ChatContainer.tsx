import React, { useCallback, useEffect, useState } from 'react';
import request from '../../utils/axios';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import {getListByCategory, getListByCategoryLimiteData,getLimitedData} from '../../modules/chat';

import Chat from '../../components/chat/Chat';

function ChatContainer() {
    let {chatcategory} = useParams();

    const [getChatProps, setGetChatProps] = useState();
    const [title, setTitle] = useState('');
    const [post_no, setPost_no] = useState(0);

    const dispatch = useDispatch();
    const data = useSelector((state:RootState)=> state.chatReducer);


    useEffect(()=> {
        // getList()
        dispatch(getListByCategory(Number(chatcategory)))
        .then((res:any)=> {
            setGetChatProps(
                res.payload.chatprops.sort((a:any, b:any) => b.post_no - a.post_no)
                )
        });


        //게시판 이름 요청
        request("post","/api/chat/get/category", {class_no : chatcategory})
        .then((res:any)=> {
            setTitle(res.result.category_name)
            setPost_no(res.result.post_no)
        })

    },[])

    const getList = useCallback(()=> {
        dispatch(getListByCategoryLimiteData(Number(chatcategory), data.post_limite, 3))
    }, [dispatch])


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