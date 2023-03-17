import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {} from '../../modules/favorit'
import { RootState } from '../../modules';

import request from '../../utils/axios';


import Favorit from '../../components/favorit/Favorit'

function FavoritContainer({post_id}:any) {
    const dispatch = useDispatch();
    const favorit_store = useSelector((state:RootState) => state.favoritRecuder);
    const auth_store = useSelector((state:RootState) => state.authCheckReducer);
    // const chat_store = useSelector((state:RootState) => state.chatReducer);

    const [fav, setFav] = useState(0);
    
    useEffect(()=> {
        getFavoritByPost_id()
        getFavoritPostId()
        // if(!post_id) return ;
    }, [dispatch])


    const getFavoritByPost_id = useCallback(()=> {
        // dispatch(getDataByPostIdThunk(post_id))
    }, [favorit_store])

    const getFavoritPostId = () => {
        request("post", "/api/favorit/get/favoritbypostid", {post_id : post_id})
        .then((res:any)=> {
            setFav(res.find)
            console.log(res)
        })
    }

    const getFavoritByUser_id = () => {
        request("post", "/api/favorit/get/favoritbyuserid", {user_id : auth_store.name})
        .then((res:any)=> {
            setFav(res.find)
            console.log(res)
        })
    }
    

    if(favorit_store.loading) return <>loading...</>

    return (
        <div>
            <Favorit 
                auth={auth_store.isAuth}
                FavProps={favorit_store.data.find}
                favLength={fav}
    
            />
            <span>{post_id}</span>
            
        </div>
    ) 

}

export default FavoritContainer