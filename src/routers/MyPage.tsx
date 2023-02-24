import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import axios from "axios";

function MyPage() {
    let {user} = useParams();

    const data = useSelector((state:RootState)=> state.authCheckReducer);
    const [myInfo, setMyInfo] = useState({
        name : '',
        userId : '',
        userNo:''
    });

    const [confirmToken, setConfirmToken] = useState({
        loginToken : '',
        localToken : '',
    })

    const [getStore, setGetStore] = useState('');

    useEffect(()=> {
        setGetStore(data.userId) // 스토어에서 조회
        

        const backAuth = axios.get('http://localhost:9999/users/auth');
        backAuth.then((res)=> {
            setMyInfo(res.data)
        })

    },[data])

    console.log('getUser -->', myInfo)
    return getStore === user && myInfo ? (
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
            <li>
                name : {myInfo.name}
            </li>
        </ul>
        </>
    ) : (
        <>정상적인 페이지 접속이 아닙니다.</>
    )
}

export default MyPage;