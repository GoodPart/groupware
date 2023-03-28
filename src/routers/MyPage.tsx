import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import axios from "axios";
import request from '../utils/axios';

function MyPage() {
    let {user} = useParams();
    console.log(user)

    const data = useSelector((state:RootState)=> state.authCheckReducer);
    const [myInfo, setMyInfo] = useState({
        name : '',
        userId : '',
        userNo:''
    });

    const [chatInfo, setChatInfo] = useState();

    // const [getStore, setGetStore] = useState('');

    useEffect(()=> {
        // setGetStore(data.userId) // 스토어에서 조회
        

        const backAuth = axios.get('http://localhost:9999/users/auth');
        backAuth.then((res)=> {
            setMyInfo(res.data)
        });

        request("post", "/api/chat/get/chatall", {userId : user})
        .then(res=> {
            setChatInfo(res.chatprops)
        })



    },[data])

    // console.log('getUser -->', myInfo)
    return user && myInfo && chatInfo ? (
        <>
        <h2>Hello!, {myInfo.name}</h2>
        
        <ul>
            {
                Object.entries(myInfo).map((ele, index)=> {
                    // console.log(ele)
                    // return false
                    if(ele[0] === 'userPw' || ele[0] === '_id' ) {
                        return false
                    }else {
                        return (
                            <li key={index}>{ele[0]} : {ele[1]}</li>
                        )
                    }
                    
                })
            }
        </ul>
        <hr />
        <h2>작성한 게시글</h2>
        <ul>
            {
                Object.values(chatInfo).map((list:any, index)=> {
                    console.log(list)
                    return (
                        <li key={index}>
                            <div>시간 : {list.post_create_date}</div>
                            <div>게시판 : {list.class_no}</div>
                            <div>제목 : {list.post_title}</div>
                            <div>내용 : {list.post_desc}</div>
                            <hr />
                        </li>
                    )
                })
            }
        </ul>
        </>
    ) : (
        <>정상적인 페이지 접속이 아닙니다.</>
    )
}

export default MyPage;