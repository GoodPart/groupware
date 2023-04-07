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
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 44px;

  a {
    color : #48484A;
    text-decoration: none;
  }

  div.header__section {
    display: flex;
  }
  h2.header__logo {
    text-decoration: none;
    margin:  0;
    font-size : 16px;
    line-height: 44px;
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
    margin-left: 16px;
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
  background-color : #0F9485;
`

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-around;
`
const ButtonItem = styled.div`
  display: flex;
  background-color: #0F9485;
  border-radius: 4px;
  transition: background-color .6s cubic-bezier(0.075, 0.82, 0.165, 1) ;

  &:hover {
    background-color: #0c7569;
  }
  a {
    padding: 12px;
    color : #fff;
    font-weight: bold;

  }
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
        navigate('/signin');
        window.location.reload();
    }

    return (
      <HeaderWrap>
          <div className='header__section'>
            <h2 className='header__logo'><Link to='/'>CHATME</Link></h2>
            <div className='page__wrap'>
                {/* <Link to='/'>Home</Link> */}
                {/* <Link to='/about'>about</Link>
                <Link to='/users'>users</Link> */}
                <Link to='/chat'>Post Place</Link>
            </div>
          </div>

          
          <div className='header__section header__section--user'>
            {
                getAuth.isAuth ? (
                  <div className='section__wrap'>
                    <NotificationContainer 
                      getAuth={getAuth}
                      badge={{bgColor: "#0F9485",txtColor : "#fff" }}
                    />
                    <div className='info__wrap'>
                      <ThumbNail>
                          <span style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", textTransform:"uppercase", fontSize:"24px", fontWeight:"bolder", color: "#48484A"}}>{getAuth.name.slice(0,1)}</span>
                      </ThumbNail>
                      <UserSettingContainer 
                        authProps={getAuth}
                        onLogOut={onLogOut}
                      />
                    </div>
                  </div>
                ) : (
                  <ButtonWrap>
                    {/* <ButtonItem>
                      <Link to='/signup'>Sign up</Link>
                    </ButtonItem> */}
                    <ButtonItem>
                      <Link to='/signin'>Sign In</Link>
                    </ButtonItem>
                  </ButtonWrap>
                )
            }
          </div>
      </HeaderWrap>
    )
}

export default Header