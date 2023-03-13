import React, { useCallback, useEffect, useState } from 'react';
import request from '../../utils/axios';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import {getListByCategory, getListByCategoryLimiteData,getLimitedData, getLimitedDataThunk, resetDataList} from '../../modules/chat';

import Chat from '../../components/chat/Chat';

function ChatContainer() {
    let {chatcategory} = useParams();

    const [getChatProps, setGetChatProps] = useState();
    const [title, setTitle] = useState('');
    const [post_no, setPost_no] = useState(0);

    const dispatch = useDispatch();
    const data = useSelector((state:RootState)=> state.chatReducer);


    useEffect(()=> {
        getListByLimit(data.meta.nextId)


        //게시판 이름 요청
        request("post","/api/chat/get/category", {class_no : chatcategory})
        .then((res:any)=> {
            setTitle(res.result.category_name)
            setPost_no(res.result.post_no)
        })


    },[])

    useEffect(() => ()=> {
        dispatch(resetDataList())
        console.log(data.meta.nextId)
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

    const morePost = useCallback(()=> {
        // console.log(nextId)
        getListByLimit(data.meta.nextId)
    }, [data.meta.nextId, data.post_list])


    


    return getChatProps  ? 
    (
        <>
        <button onClick={()=>getListByLimit(data.meta.nextId)}> more</button>
        <Chat 
                chatCategory = {chatcategory}
                chatProps={getChatProps}
                title={title}
                post_no={post_no}
            />
        </>
            
    ) : (<>loading...</>)
    
}

export default ChatContainer