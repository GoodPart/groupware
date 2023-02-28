import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import Auth from '../hoc/Auth';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../modules';
import { authCheck } from '../modules/auth';

import request from '../utils/axios';
import Auth from '../hoc/Auth';



function Header() {
    const navigate = useNavigate();
    // const data = useSelector((state:RootState)=> state.authCheckReducer);
    const dispatch = useDispatch();
    const [getAuth, setGetAuth] = useState({
      isAuth : false,
      name : "",
      userId :  "",
      _id : "",
      userNo : "",
    });
    
    useEffect(()=> {
      dispatch(authCheck()).then((res:any)=> {
        const isAuth = res.payload.isAuth;
        if(!isAuth) {
          setGetAuth(res.payload)
        }else {
          setGetAuth(res.payload)
        }
        console.log(res)
      });


    },[])

    const onLogOut = () => {
        request('get',"/api/users/logout",{})
        .then(res=> {
            console.log(res.success)
        })
        navigate('/');
        window.location.reload();

        // dispatch(au)
    }

    return (
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/about'>about</Link>
      </li>
      <li>
        {
            getAuth.isAuth ? (
              <>
                <Link to={`/mypage/${getAuth.userId}`}>내정보</Link>
                <button onClick={onLogOut}>로그아웃</button>
              </>
            ) : (
              <>
                <Link to='/signup'>가입하기</Link>
                /
                <Link to='/signin'>로그인</Link>
              </>
            )
        }
      </li>
      <li>
        <Link to='/users'>users</Link>
      </li>
      <li>
      <Link to='/chat'>채팅광장</Link>
        
        {
            // getAuth.isAuth ? <Link to={`/chat/${getAuth.userId}`}>내정보</Link> : "" 
        }
      </li>
    </ul>
    )
}

export default Header