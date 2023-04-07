import React from 'react';
import { Link } from 'react-router-dom';
import styled, {css} from 'styled-components'

const NotificationWrap = styled.div<{display:string}>`
    position: absolute;
    display: ${props => props.display === 'true' ? "block" : "none"};
    top : 56px;
    right: 0;
    background-color: #fff;
    padding: 16px;
    width: 240px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 10px 0px;
    font-family: 'Sono';
    z-index : 10000;

    h2 {
        font-size: 14px
    }
    div.user__wrap {
        display: flex;
    }

    ol {
        margin : 0;
        padding : 8px 0;
        list-style: none;
        border-top: 1px solid rgb(221, 221, 221);
        /* border-bottom: 1px solid rgb(221, 221, 221); */
    }
    li {
        padding: 8px;
        border-radius:  4px;
        transition: background-color .6s cubic-bezier(0.075, 0.82, 0.165, 1);
        &:hover {
            background-color: rgba(0,0,0,0.1)
        }
    }
    li + li {
    }
    li a {
        display: block;
        width : 100%;
        font-size : 14px;
        font-weight : 400;
        color : #444;
        text-decoration: none;
    }
    li button {
        cursor: pointer;
        padding: 0;
        text-align: left;
        width : 100%;
        font-size : 14px;
        font-weight : 400;
        color : #444;
        text-decoration: none;
        border: none;
        background-color: transparent;
    }
`
const NotificationHeader = styled.div`
    height : 44px;
    h3 {
        margin : 0;
        width: 100%;
        text-align: center;
        color: #7c7272;
        line-height: 46px;
    }
    border-bottom: 1px solid #eee;
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
const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    span.user-name {
        font-weight : bold;
        color : #48484A
    }
    span.user-id {
        color : gray
    }
`

export default function UserSetting({authProps, onLogOut, toggleProps}:any) {
    // console.log(authProps)
    return(
        // 내정보 - 게시글, 댓글, 좋아요, 정보 등등
        // 로그아웃
        <NotificationWrap display={String(toggleProps)}>
            <h2>계정</h2>
            <div className="user__wrap">
                <ThumbNail>
                    <span style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", textTransform:"uppercase", fontSize:"24px", fontWeight:"bolder"}}>{authProps.userId.slice(0,1)}</span>
                </ThumbNail>
                <UserInfo>
                    <span className='user-name'>{authProps.name}</span>
                    <span className='user-id'>{authProps.userId}</span>
                </UserInfo>
            </div>
            <ol>
                <li>
                    <Link to={`/mypage/${authProps.userId}`}>Setting</Link>
                </li>
                <li>
                    <button type='button' onClick={onLogOut}>Log Out</button>
                </li>
            </ol>
            {/* <button type='button' onClick={onLogOut}>로그아웃</button> */}
        </NotificationWrap>
    )
}