import React, {ChangeEvent, FormEvent, useEffect,useCallback, useState} from 'react';
import { text } from 'stream/consumers';
import ChatEdit from '../../components/chat/ChatEdit'
import request from '../../utils/axios';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../modules';
import { authCheck } from '../../modules/auth';
import { updatePost} from '../../modules/chat'


function ChatEditContainer({category_no}:any) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const data = useSelector((state:RootState)=> state.authCheckReducer);
    const chatdata = useSelector((state:RootState)=> state.chatReducer);

    const [textValue , setTextValue] = useState("");
    const [titleValue, setTitleValue] = useState("");
   
    useEffect(()=> ()=>{
    //    console.log('---->',data)
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


    const onSubmit = async (e:FormEvent<HTMLFormElement>)=> {
        // e.preventDefault();
        const getPost_no = await request("post","/api/chat/get/category", {class_no : Number(category_no)})

            request("post", "/api/chat/update/category", {class_no : category_no, post_no : getPost_no.result.post_no })

            let _form = {
                post_no : getPost_no.result.post_no,
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
            

            setTimeout(()=> {
                dispatch(updatePost(_form))
            }, 2000)
        



        // await request("post", "/api/chat/createchat", _form)
        // .then((res:any)=> {
        //     if(res) {
        //         request("post", "/api/chat/update/category", {class_no : category_no, post_no : post_no })
        //         dispatch(resetDataList());
        //         setTimeout(()=> {
        //             _getChats();
        //         }, 3000)
        //     }
        //     // console.log(res)
        // })

        // request("post", "/api/chat/update/category", {class_no : category_no, post_no : post_no })
        // .then(res=> {
        //     // console.log(res)
        // })
        
        // navigate(`/chat/${category_no}`)
        // window.location.reload()
       




    }

    // const _getChats = useCallback(()=> {
    //     let form = {
    //         chatName : Number(category_no),
    //         count : 3,
    //         nextId : chatdata.meta.nextId,
    //         history : ''
    //     }

    //     if(chatdata.meta.nextId === null) {
    //         alert("모든 데이터를 조회했습니다.")
    //     }else {
    //         dispatch(getChats(form))
            
    //         // console.log(data)
    //     }
     
    // }, [dispatch, chatdata])

    return (
        <ChatEdit 
            handleSetTab={handleSetTab}
            onChange={onChangeValue}
            onChangeValueTitle={onChangeValueTitle}
            textValue={textValue}
            titleValue={titleValue}
            onSubmit={onSubmit}
            auth={data.isAuth}
            // onChange={onChangeValue}
        />
    )
}

export default ChatEditContainer;