import React,{useEffect, useCallback, useState} from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { viewPost } from '../../modules/chat';

import PostView from '../../components/chat/PostView';

export default function PostViewContainer() {
    let {category, post_id} = useParams();
    const dispatch = useDispatch();

    const [post, setPost] = useState()

    useEffect(()=> {
        dispatch(viewPost(String(post_id)))
        .then((res:any)=>{
            setPost(res.payload)
        })
    }, [])

    if(!post) return <>loading...</>;
    
    return (
        <PostView post={post} />
    )
}