import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

// import Auth from '../hoc/Auth';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../modules';
import { authCheck } from '../modules/auth';

import request from '../utils/axios';



function Header() {
    const data = useSelector((state:RootState)=> state.authCheckReducer);
    const dispatch = useDispatch();
    useEffect(()=> {
        console.log(data)
    },[data])

    const onLogOut = () => {
        request('get',"/api/users/logout",{})
        .then(res=> {
            console.log(res.success)
        })
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
        <Link to='/signup'>가입하기</Link>
      </li>
      <li>
        {
            data.isAuth ? <button onClick={onLogOut}>로그아웃</button> : <Link to='/signin'>로그인</Link>
        }
        
      </li>
      <li>
        <Link to='/users'>users</Link>
      </li>
    </ul>
    )
}

export default Header