import React,{useEffect, useCallback, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { viewPost } from '../../modules/chat';

import { RootState } from '../../modules';

import PostView from '../../components/chat/PostView';

export default function PostViewContainer() {
    let {post_id, comment_id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = useSelector((state:RootState)=> state.chatReducer);

    
    useEffect(()=> {
        dispatch(viewPost(String(post_id)))
        
        // .then((res:any)=>{
        //     console.log(res)
        //     setPost(res)

        //     // res.success ? navigate(`/chat/${}/${}/post-view`) : navigate()
        // })
    }, [dispatch])

    if(data.post_view.loading) return <>loading...</>;
    if(!data.post_view.comment_data) return <>loading...</>;

    return (
        <PostView 
        post={data.post_view.post_data} 
        comment_id={comment_id}
        />
    )
}