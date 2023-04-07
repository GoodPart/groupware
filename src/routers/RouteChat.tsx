import React, { useEffect } from 'react';
import ChatContainer from '../containers/chat/ChatContainer';
import { useParams } from 'react-router-dom';
function Chat() {
    useEffect(()=> {
        // console.log("routChat")

    }, [])
    return (
        <ChatContainer />
    )
}

export default Chat;