import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import { text } from 'stream/consumers';
import CommentEdit from '../../components/chat/CommentEdit'
import request from '../../utils/axios';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../modules';


function CommentEditContainer({post_id, type}:any) {
    const data = useSelector((state:RootState)=> state.authCheckReducer);
    const chatStore = useSelector((state:RootState) => state.chatReducer);

    const [textValue , setTextValue] = useState("");
    useEffect(()=> {
    //    console.log('post_id -->', post_id, 'type->', type)
    //    console.log('---->', chatStore.chats.data)
    }, [])

    const onChangeValue = (e:ChangeEvent<HTMLInputElement>) => {
        setTextValue(e.target.value);
    };
    const handleSetTab = (e:any) => {
        if(e.keyCode === 9) {
            // e.returnValue = false 
            e.preventDefault();
            let val = e.target.value;
            let start = e.target.selectionStart;
            let end = e.target.selectionEnd;
            e.target.value = val.substring(0, start) + "\t" + val.substring(end);
            e.target.selectionStart = e.target.selectionEnd = start + 1;
            onChangeValue(e);
            return false;
        }
    }

    const onCreateNotification = (type:any) => {
        let form = {
            receiver_id : post_id.userId, // 해당 글 작성자
            writer_id : data.userId, // 이 코멘트를 쓰는 사람 - 코멘터
            post_id : post_id._id, //포스트 id
            noti_desc : textValue,
            noti_type : type,
            create_at : "",
            is_checked : false
        };

        request('post', '/api/notification/create/user', form)
        .then(res=> {
            console.log(res)
        })
    }
    const onCreateNotificationRecoment = (type:any) => {
        let form = {
            receiver_id : post_id.userId, // 해당 글 작성자
            writer_id : data.userId, // 이 코멘트를 쓰는 사람 - 코멘터
            post_id : post_id.post_comment_code, //포스트 id
            noti_desc : textValue,
            noti_type : type,
            create_at : "",
            is_checked : false
        };

        request('post', '/api/notification/create/user', form)
        .then(res=> {
            console.log(res)
        })
    }


    const onSubmit = (e:FormEvent<HTMLFormElement>)=> {

        
        if(type === 'recoment') {
            let _form = {
                post_comment_code : post_id.post_comment_code,
                comment_code : post_id._id,
                re_comment_desc : textValue,
                re_comment_create_date : "",
                re_comment_update_date : "",
                from : data.userId,
                to : post_id.userId
            }
            // console.log(_form)

            request("post", "/api/chat/create/recoment", _form)
            .then((res:any)=> {
    
                if(res.success) {
                    onCreateNotificationRecoment(type)
                    window.location.reload()
                }else {
                    alert('error')
                }
            })
        }else {
            let _form = {
                post_comment_code : post_id._id,
                post_comment_desc : textValue,
                post_comment_create_date : "",
                post_comment_update_date : "",
                userId : data.userId,
            }

            // console.log(post_id)
            request("post", "/api/chat/create/comment", _form)
            .then((res:any)=> {
                console.log(res.payload)
    
                if(res.success) {
                    onCreateNotification(type)
                    window.location.reload()
                }else {
                    alert('error')
                }
            })
        }

        
    }

    return (
        <CommentEdit 
        handleSetTab={handleSetTab}
        onChange={onChangeValue}
        textValue={textValue}
        onSubmit={onSubmit}
        auth={data.isAuth}
        />
    )
}

export default CommentEditContainer;