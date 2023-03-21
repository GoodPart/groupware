import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataByPostId, checkAuth, inCreaseFavorit, deCreaseFavorit } from '../../modules/favorit'
import { RootState } from '../../modules';

import request from '../../utils/axios';


import Favorit from '../../components/favorit/Favorit'

function FavoritContainer({post_id}:any) {
    const dispatch = useDispatch();

    const favorit_store = useSelector((state:RootState) => state.favoritRecuder);
    const auth_store = useSelector((state:RootState) => state.authCheckReducer);

    const [favoritCount, setFavoritCount] = useState(0);
    const [checkFavorit, setCheckFavorit] = useState(false);
    
    useEffect(()=> {
        // getFavoritPostId()
        if(!auth_store.isAuth) {
            //미 로그인
            
        }else {
            //로그인
            request("post", "/api/favorit/get/favoritauth", {post_id : post_id, user_id : auth_store.userId})
            .then((res:any)=> {
                setCheckFavorit(res.find)
            })
        }
        
        request("post", "/api/favorit/get/favoritbypostid", {post_id : post_id})
        .then((res:any)=> {
            setFavoritCount(res.find)
        })
        
    }, [dispatch, favoritCount, checkFavorit])

    const inCreaseFavoritHandle = ()=> {
        
        dispatch(inCreaseFavorit(post_id, auth_store.userId))
        setFavoritCount(favoritCount + 1);
    }

    const deCreaseFavoritHandle = ()=> {
        
        dispatch(deCreaseFavorit(post_id, auth_store.userId))
        setFavoritCount(favoritCount - 1);
    }

    const favoritUpdate = useCallback((e:any)=> {
        const checked = e.target.checked;

        if(checked) {
            //좋아요
            inCreaseFavoritHandle()
            setCheckFavorit(checked)
        }else {
            deCreaseFavoritHandle()
            setCheckFavorit(checked)
        }
    }, [dispatch])
    

    if(favorit_store.loading) return <>loading...</>
    if(!auth_store) return <>loading...</>

    return (
        <Favorit 
            checkAuth={auth_store.isAuth}
            input_id={post_id}
            checkFavorit={checkFavorit}
            favoritCount={favoritCount}
            onChange={favoritUpdate}

        />
    ) 

}

export default FavoritContainer