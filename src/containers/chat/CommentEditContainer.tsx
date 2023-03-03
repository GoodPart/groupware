import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import { text } from 'stream/consumers';
import CommentEdit from '../../components/chat/CommentEdit'
import request from '../../utils/axios';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../modules';
import { authCheck } from '../../modules/auth';


function CommentEditContainer({_id}:any) {
    const navigate = useNavigate();

    const data = useSelector((state:RootState)=> state.authCheckReducer);

    const [textValue , setTextValue] = useState("");
    useEffect(()=> {
       console.log(_id)
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


    const onSubmit = (e:FormEvent<HTMLFormElement>)=> {
        // e.preventDefault();

        let _form = {
            post_comment_code : _id,
            post_comment_desc : textValue,
            post_comment_create_date : "",
            post_comment_update_date : "",
            userId : data.userId,
        }

        request("post", "/api/chat/create/comment", _form)
        .then((res:any)=> {
            console.log(res.payload)
        })
        
        window.location.reload()
       




    }

    return (
        <CommentEdit 
        handleSetTab={handleSetTab}
        onChange={onChangeValue}
        textValue={textValue}
        onSubmit={onSubmit}
        />
    )
}

export default CommentEditContainer;