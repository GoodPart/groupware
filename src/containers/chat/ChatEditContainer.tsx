import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import { text } from 'stream/consumers';
import ChatEdit from '../../components/chat/ChatEdit'
import request from '../../utils/axios';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../modules';
import { authCheck } from '../../modules/auth';


function ChatEditContainer({category_no, post_no}:any) {
    const navigate = useNavigate();

    const data = useSelector((state:RootState)=> state.authCheckReducer);

    const [textValue , setTextValue] = useState("");
    const [titleValue, setTitleValue] = useState("");
   
    useEffect(()=> {
       console.log(post_no)
    }, [])

    const onChangeValue = (e:ChangeEvent<HTMLInputElement>) => {
        setTextValue(e.target.value);
    };
    const onChangeValueTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value)
    }

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
            post_no : post_no,
            class_no : category_no,
            post_desc : textValue,
            post_title:titleValue,
            post_comment_count : "",
            post_comment_code : "",
            post_create_data : "",
            post_edite_date : "",
            favorit_count : 0,
            userId : data.userId,
        }

        request("post", "/api/chat/createchat", _form)
        .then((res:any)=> {
            console.log(res)
        })

        request("post", "/api/chat/update/category", {class_no : category_no, post_no : post_no })
        .then(res=> {
            console.log(res)
        })
        
        navigate(`/chat/${category_no}`)
        window.location.reload()
       




    }

    return (
        <ChatEdit 
        handleSetTab={handleSetTab}
        onChange={onChangeValue}
        onChangeValueTitle={onChangeValueTitle}
        textValue={textValue}
        titleValue={titleValue}
        onSubmit={onSubmit}
            // onChange={onChangeValue}
        />
    )
}

export default ChatEditContainer;