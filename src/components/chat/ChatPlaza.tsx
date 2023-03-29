import {Link } from "react-router-dom"
import styled from "styled-components"

const Page__title = styled.h2`
    padding: 16px;
    font-size : 20px;
    color : #48484A;
    background-color: #fff;
    border-radius: 6px;
    margin : 12px 0;
`
function ChatPlaza({chatList}:any) {
    // console.log(chatList)

    // chatList.map((chat:any, index:number)=> {
    //     console.log({chat})
    // })
    return (
        <>
            <Page__title className='page__title'>게시판</Page__title>
            <ul>
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
            </ul>
        </>
    )
}

export default ChatPlaza