import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import axios from "axios";
import request from '../utils/axios';
import styled from 'styled-components';

import PaginationContainer from '../containers/PaginationContainer';

import * as InputForm from '../components/styledComponents/InputStyled';
import * as ButtonForm from '../components/styledComponents/ButtonStyled'

const Page__title = styled.h2`
    padding: 16px;
    font-size : 20px;
    color : #48484A;
    background-color: #fff;
    border-radius: 6px;
    margin : 12px 0;
`

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

    useEffect(()=> {
        // setGetStore(data.userId) // 스토어에서 조회
        

        const backAuth = axios.get('http://localhost:9999/users/auth');
        backAuth.then((res)=> {
            setMyInfo(res.data)
        });

        request("post", "/api/chat/get/chatall", {userId : user})
        .then(res=> {
            setChatInfo(
                res.chatprops.sort((a:any, b:any) => +new Date(b.post_create_date) - +new Date(a.post_create_date))
            )
        })



    },[data])

    return user && myInfo && chatInfo ? (
        <>
        <Page__title>
            My Page - <em style={{fontSize : "14px", color : "#aaa"}}>can't edit yet, sorry</em>
        </Page__title>
        {/* <h2>Hello!, {myInfo.name}</h2> */}
        
        <h3>My Infomation</h3>
        <ul style={{padding : 0}}>
            {
                Object.entries(myInfo).map((ele, index)=> {
                    if(ele[0] === 'userPw' || ele[0] === '_id' ) {
                        return false
                    }else {
                        return (
                            <li key={index} style={{listStyle : "none"}}>
                                <InputForm.InputFormWrap check={ele[0]}>
                                    <input type="text" value={ele[1]} readOnly/>
                                    <label>{ele[0]}</label>
                                </InputForm.InputFormWrap>
                                <br />
                            </li>
                        )
                    }
                    
                })
            }
        </ul>
        {/* <h2>작성한 게시글</h2> */}
            <PaginationContainer postsList={chatInfo} />
        </>
    ) : (
        <>정상적인 페이지 접속이 아닙니다.</>
    )
}

export default MyPage;