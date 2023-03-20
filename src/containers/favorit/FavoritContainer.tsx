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
    // const chat_store = useSelector((state:RootState) => state.chatReducer);

    const [favoritCount, setFavoritCount] = useState(0);
    const [checkFavorit, setCheckFavorit] = useState(false);
    
    useEffect(()=> {
        // getFavoritPostId()
        if(!auth_store.isAuth) {
            //미 로그인
            
        }else {
            //로그인
            // /api/favorit/get/favoritauth
            request("post", "/api/favorit/get/favoritauth", {post_id : post_id, user_id : auth_store.userId})
            .then((res:any)=> {
                console.log("로그인")
                setCheckFavorit(res.find)
            })
        }
        
        request("post", "/api/favorit/get/favoritbypostid", {post_id : post_id})
        .then((res:any)=> {
            setFavoritCount(res.find)
        })
        
    }, [dispatch, favoritCount, checkFavorit])
    // console.log(favoritCount)


    const getFavoritByPost_id = useCallback(()=> {
        // dispatch(getDataByPostIdThunk(post_id))
    }, [favorit_store])

    // const getFavoritPostId = () => {
    //     request("post", "/api/favorit/get/favoritbypostid", {post_id : post_id})
    //     .then((res:any)=> {
            
    //         setFavoritCount(res.find)
    //     })
    // }

    // const update = useCallback((event:any) => {
    //     // event.checked
    //     const updateType = event.checked ? "increase" : "decrease";

    //     dispatch(updateFavCountOfChat(post_id, auth_store.isAuth, updateType))
    //     if(updateType === 'increase') {
    //         const result = fav + 1;
    //         setFav(result)
    //     }else {
    //         const result = fav - 1;
    //         setFav(result)
    //     }

    // }, [dispatch, post_id, auth_store.isAuth])

    const checkConfirm = (post_id:string, auth:any) => {
        const _auth = auth.isAuth;
        const _authUserId = auth.userId;

        if(!_auth) {
            // 미 로그인 상태 
            return false;
        }else {
            // 로그인
            const checking = dispatch(checkAuth(post_id, _authUserId));

            checking.then((res:any) => {
                console.log(res.payload)
                return res.payload.find
            })

        }
    }

    const inCreaseFavoritHandle = ()=> {
        console.log(auth_store.userId)
        
        dispatch(inCreaseFavorit(post_id, auth_store.userId))
        console.log(favoritCount + 1)
        setFavoritCount(favoritCount + 1);
    }

    const deCreaseFavoritHandle = ()=> {
        console.log(auth_store.userId)

        
        dispatch(deCreaseFavorit(post_id, auth_store.userId))
        console.log(favoritCount - 1)
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
        <div>
            <Favorit 
                input_id={post_id}
                checkFavorit={checkFavorit}
                favoritCount={favoritCount}
                onChange={favoritUpdate}
                // FavProps={favorit_store.data.find}
                // favLength={fav}
                // onUpdate={update}
    
            />
            {/* <span>{post_id}</span> */}
            
        </div>
    ) 

}

export default FavoritContainer