import React, { useCallback, useEffect, useState } from 'react';
import request from '../../utils/axios';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import {getListByCategory, getListByCategoryLimiteData,getListLimiteAsync, getLimitedDataThunk, resetDataList, getChats} from '../../modules/chat';

import Chat from '../../components/chat/Chat';

function ChatContainer() {
    let {chatcategory} = useParams();

    const [getChatProps, setGetChatProps] = useState();
    const [title, setTitle] = useState('');
    const [post_no, setPost_no] = useState(0);

    const data = useSelector((state:RootState)=> state.chatReducer);
    const dispatch = useDispatch();


    useEffect(()=> {
        _getChats()
        // getListByLimit(data.meta.nextId)
        // dispatch(getListLimiteAsync({categoryName : Number(chatcategory),start : data.meta.nextId, count:7}))

        //게시판 이름 요청
        request("post","/api/chat/get/category", {class_no : chatcategory, start : data.meta.nextId})
        .then((res:any)=> {
            setTitle(res.result.category_name)
            setPost_no(res.result.post_no)
        })


    },[dispatch])

    useEffect(() => ()=> {
        dispatch(resetDataList())
        // console.log(data.meta.nextId)
    }, [dispatch])

    const getListByLimit = useCallback((nextId:any)=> {

        if(nextId === null) {
            alert('마지막입니다.')
        }else {
            dispatch(getLimitedDataThunk(Number(chatcategory),nextId, 2))
            .then((res:any)=> {
                setGetChatProps(
                    res.payload.data.sort((a:any, b:any) => b.post_no - a.post_no)
                    // getChatProps.push() 
                )
            })

        }
    }, [dispatch])

    const _getChats = useCallback(()=> {
        let form = {
            chatName : Number(chatcategory),
            count : 2,
            nextId : data.meta.nextId,
            history : ''
        }

     
        dispatch(getChats(form))
    }, [dispatch, data ])


    


    if(data.chats.loading) return <div>로딩중...</div>
    if(data.chats.error) return <div>에러...</div>
    if(!data.chats.data) return null;


    return  (
        <>
        <button onClick={()=>_getChats()}> more</button>
        <Chat 
                chatCategory = {chatcategory}
                chatProps={data.chats.data.sort((a:any, b:any) => b.post_no - a.post_no)}
                title={title}
                post_no={post_no}
            />
        </>
            
    ) 
    
}

export default ChatContainer