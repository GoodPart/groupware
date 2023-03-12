import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import Auth from '../hoc/Auth';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../modules';
import { authCheck } from '../modules/auth';
import { getNotiList } from '../modules/notification';


import request from '../utils/axios';
import Auth from '../hoc/Auth';


// import NotificationViewContainer from '../containers/notification/NotificationViewContainer';
import NotificationContainer from '../containers/notification/NotificationContainer';



function Header() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [getAuth, setGetAuth] = useState({
      isAuth : false,
      name : "",
      userId :  "",
      _id : "",
      userNo : "",
    });

    useEffect(()=> {
      requestAuto()

    }, [])

    const requestAuto = () => {
      dispatch(authCheck()).then((res:any)=> {
        console.log(res.payload)
        setGetAuth(res.payload)
        dispatch(getNotiList(res.payload.userId))
        return console.log("checked...")
      })
    }

    const onLogOut = () => {
        request('get',"/api/users/logout",{})
        .then(res=> {
            console.log(res.success)
        })
        navigate('/');
        window.location.reload();

        // dispatch(au)
    }

    // console.log(data)

    return (
      

    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/about'>about</Link>
      </li>
      <li>
          <Link to='/users'>users</Link>
        </li>
        <li>
          <Link to='/chat'>채팅광장</Link>
        </li>
        <li>
          {
              getAuth.isAuth ? (
                <>
                  <div>
                    <NotificationContainer 
                      getAuth={getAuth}
                      badge={{bgColor: "coral",txtColor : "#fff" }}
                    />
                    {/* <NotificationViewContainer
                      getAuth={getAuth}
                    /> */}
                  </div>
                  <div>
                    <span className='thumbnail'>썸네일 - </span>
                    <span style={{fontWeight : "bold"}}>{getAuth.name} / </span>
                    <Link to={`/mypage/${getAuth.userId}`}>내정보</Link>
                    <button onClick={onLogOut}>로그아웃</button>
                  </div>
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
      </ul>
    )
}

export default Header