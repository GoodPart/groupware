import React, { useEffect } from 'react';
import styled from 'styled-components';


import CommentContainer from '../../containers/chat/CommentContainer';
import ChatEditContainer from '../../containers/chat/ChatEditContainer';

import FavoritContainer from '../../containers/favorit/FavoritContainer';
import CommentBadgeContainer from '../../containers/comment/CommentBadgeContainer';

import PostViewSkeleton from './PostViewSkeleton';

const Page__title = styled.h2`
    position: relative;
    padding: 16px;
    color : #48484A;
    background-color: #fff;
    border-radius: 6px;
    margin : 12px 0;
    height : 26px;

    &:after {
        content: '';
        display: inline-block;
        position: absolute;
        top : 50%;
        left : 16px;
        transform: translateY(-50%);
        width : 100px;
        height : 20px;
        background-color: #E5E7EB
    }
`

const ListWrap = styled.ul`
    background-color: #E5E7EB;
    padding: 16px;

    li {
        opacity : 0;
        background-color: #fff;
        list-style: none;
        padding: 16px;
        margin-bottom: 16px;
        border-radius: 6px;
        transform: scale(.9);
        animation-name: show;
        animation-duration: .4s;
        animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        animation-fill-mode: forwards;
    }
   
   @keyframes show {
    0% {
        opacity : 0;
        transform: scale(.9);
    }
    100% {
        opacity : 1;
        transform: scale(1);

    }
   }
`

function ChatSkeleton({}:any) {

   
    useEffect(()=> {
        // console.log(chatProps)
    }, [])
    return (
        <>
            <Page__title className='page__title'></Page__title>
            <ChatEditContainer
                // category_no={chatCategory}
                // chatProps={chatProps}
                // post_no={post_no}
             />
            <ListWrap>
                {
                    <>
                        <PostViewSkeleton />
                        <PostViewSkeleton />
                        <PostViewSkeleton />
                    </>
                }
            </ListWrap>
        </>
    )
}

export default ChatSkeleton