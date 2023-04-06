import React,{useEffect, useCallback, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { viewPost } from '../../modules/chat';

import { RootState } from '../../modules';

import PostView from '../../components/chat/PostView';
import PostViewSkeleton from '../../components/chat/PostViewSkeleton';

export default function PostViewContainer() {
    let {post_id, comment_id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = useSelector((state:RootState)=> state.chatReducer);

    
    useEffect(()=> {
        // console.log(post_id, comment_id)
        dispatch(viewPost(String(post_id)))
    }, [dispatch])

    if(data.post_view.loading) return <PostViewSkeleton></PostViewSkeleton>;
    if(!data.post_view.comment_data) return <PostViewSkeleton></PostViewSkeleton>;

    return (
        <PostView 
        post={data.post_view.post_data} 
        comment_id={comment_id}
        />
    )
}