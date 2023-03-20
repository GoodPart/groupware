import React, { useCallback, useEffect, useState } from 'react';
import request from '../../utils/axios';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import {resetDataList, getChats} from '../../modules/chat';
import { requestFavorit } from '../../modules/favorit';


import Chat from '../../components/chat/Chat';

function ChatContainer() {
    let {chatcategory} = useParams();

    const [getChatProps, setGetChatProps] = useState();
    const [title, setTitle] = useState('');
    const [post_no, setPost_no] = useState(0);

    const data = useSelector((state:RootState)=> state.chatReducer);
    const favorit_store = useSelector
    const dispatch = useDispatch();


    useEffect(()=> {
        _getChats()
        // getFavoritByPost_id()
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
    }, [dispatch])

  

    const _getChats = useCallback(()=> {
        let form = {
            chatName : Number(chatcategory),
            count : 2,
            nextId : data.meta.nextId,
            history : ''
        }

        if(data.meta.nextId === null) {
            alert("모든 데이터를 조회했습니다.")
        }else {
            dispatch(getChats(form))
            
            // console.log(data)
        }
     
    }, [dispatch, data])


    
    


    if(data.chats.loading) return <div>로딩중...</div>
    if(data.chats.error) return <div>에러...</div>
    if(!data.chats.data) return null;


    return  (
        <>
        <Chat 
            chatCategory = {chatcategory}
            chatProps={data.chats.data.sort((a:any, b:any) => b.post_no - a.post_no)}
            title={title}
            post_no={post_no}
        />
        <button onClick={()=>_getChats()}> more</button>

        </>
            
    ) 
    
}

export default ChatContainer