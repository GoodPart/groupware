import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataByPostId, checkAuth, inCreaseFavorit, deCreaseFavorit } from '../../modules/favorit'
import { RootState } from '../../modules';

import request from '../../utils/axios';


import Favorit from '../../components/favorit/Favorit'

function FavoritContainer({post_id, post_write_user}:any) {
    const dispatch = useDispatch();

    const favorit_store = useSelector((state:RootState) => state.favoritRecuder);
    const auth_store = useSelector((state:RootState) => state.authCheckReducer);

    const [favoritCount, setFavoritCount] = useState(0);
    const [checkFavorit, setCheckFavorit] = useState(false);
    const [postInfo, setPostInfo] = useState('');
    
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
            // console.log('---->', res.find)
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
        const checked = e.currentTarget.checked;

        if(checked) {
            //좋아요
            inCreaseFavoritHandle()
            onCreateNotification()
            setCheckFavorit(checked)
        }else {
            deCreaseFavoritHandle()
            setCheckFavorit(checked)
        }
    }, [dispatch])

    const onCreateNotification = () => {
        let form = {
            receiver_id : post_write_user, // 해당 글 작성자
            writer_id : auth_store.userId, // 이 코멘트를 쓰는 사람 - 코멘터
            post_id : post_id, //포스트 id
            noti_desc : '',
            noti_type : "favorit",
            create_at : "",
            is_checked : false
        };

        request('post', '/api/notification/create/user', form)
        .then(res=> {
            console.log(res)
        })
    }
    

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