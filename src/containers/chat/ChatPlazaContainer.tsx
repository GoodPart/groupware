import React,{ useEffect, useState } from 'react'
import ChatPlaza from '../../components/chat/ChatPlaza'
import request from '../../utils/axios'

function ChatPlazaContainer() {

    const [chatList, setChatList] = useState('');
    useEffect(()=> {
        const data = request('get', '/api/chat/get/categoryall',{});

        data.then((res)=> {
            console.log(res.getData)

            setChatList(res.getData);
        })
    }, [])

    return chatList ? (
        <ChatPlaza 
            chatList={chatList}
        />
    ) : (
        <>loading...</>
    )
     
}

export default ChatPlazaContainer