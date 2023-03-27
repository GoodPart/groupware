import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import Auth from '../hoc/Auth';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../modules';
import { authCheck } from '../modules/auth';
import { getNotiList } from '../modules/notification';


import styled from 'styled-components';


import request from '../utils/axios';


// import NotificationViewContainer from '../containers/notification/NotificationViewContainer';
import NotificationContainer from '../containers/notification/NotificationContainer';
import UserSettingContainer from '../containers/userISetting/UserSettingContainer';



const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  /* background-color: #26446c; */

  div.header__section {
    display: flex;
  }

  div.page__wrap {
    margin-left : 32px;
    display: flex;
    align-items: center;
  }
  div.page__wrap a {
    margin-right: 8px;
  }
  div.page__wrap a:last-child {
    margin-right: 0;
  }

  div.section__wrap {
    display: flex;
    justify-content: space-between;
  }
  div.info__wrap {
    display: flex;
  }
  span.info__name {
    align-self: center;
  }
`
const ThumbNail = styled.div`
  align-self: center;
  position : relative;
  margin: 8px;
  width : 40px;
  height : 40px;
  border-radius : 25px;
  background-color : pink;
`

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
    }

    return (
      <HeaderWrap>
          <div className='header__section'>
            <h2 className='header__logo'><Link to='/'>Logo</Link></h2>
            <div className='page__wrap'>
                {/* <Link to='/'>Home</Link> */}
                <Link to='/about'>about</Link>
                <Link to='/users'>users</Link>
                <Link to='/chat'>채팅광장</Link>
            </div>
          </div>

          
          <div className='header__section header__section--user'>
            {
                getAuth.isAuth ? (
                  <div className='section__wrap'>
                    <NotificationContainer 
                      getAuth={getAuth}
                      badge={{bgColor: "coral",txtColor : "#fff" }}
                    />
                    <div className='info__wrap'>
                      <ThumbNail>
                          <span style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", textTransform:"uppercase", fontSize:"24px", fontWeight:"bolder"}}>{getAuth.name.slice(0,1)}</span>
                      </ThumbNail>
                      <span className='info__name'>{getAuth.name}</span>
                      <UserSettingContainer />
                      {/* <Link to={`/mypage/${getAuth.userId}`}>내정보</Link> */}
                      {/* <button onClick={onLogOut}>로그아웃</button> */}
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to='/signup'>가입하기</Link>
                    /
                    <Link to='/signin'>로그인</Link>
                  </>
                )
            }
          </div>
      </HeaderWrap>
    )
}

export default Header