import { Navigate, Link } from "react-router-dom"
function ChatPlaza({chatList}:any) {
    // console.log(chatList)

    // chatList.map((chat:any, index:number)=> {
    //     console.log({chat})
    // })
    return (
        <>
            chatPlaza
            <hr />
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