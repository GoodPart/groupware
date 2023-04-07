import {Link } from "react-router-dom"
import styled from "styled-components"

import Icon from "../../modules/icon/Icon"


const Page__title = styled.h2`
    padding: 16px;
    font-size : 20px;
    color : #48484A;
    background-color: #fff;
    border-radius: 6px;
    margin : 12px 0;
`
const Page__ul = styled.ul`
    margin: 16px 0;
    padding: 0;

    li {
        list-style: none;
        background-color: #fff;
        border-radius : 4px;
        

        &:hover a {
            background-color: grey;
            color : #fff
        }
    }

    li + li {
        margin-top: 8px;
    }

    li a {
        display: block;
        padding: 8px 16px;
        border-radius : 4px;
        font-weight: bold;
        color: #48484A;
        text-decoration: none;
        transition: background-color .6s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
`

function ChatPlaza({chatList}:any) {
    return (
        <>
            <Page__title className='page__title'>게시판</Page__title>
            <Page__ul>
                {
                    chatList.map((chat:any,index:number)=> {
                        return (
                            <li key={index}>
                                <Link to={`/chat/${chat.class_no}` }>
                                    {chat.category_name}
                                </Link>
                            </li>
                        )
                    })
                }
            </Page__ul>
        </>
    )
}

export default ChatPlaza