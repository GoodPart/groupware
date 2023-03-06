import { MouseEventHandler } from "react"

type PropsState = {
    notiData: any,
    onCheckHandle: any,
    onDeleteHandle : (e:any,props:string)=>void
}

function NotificationView({notiData, onCheckHandle, onDeleteHandle}:PropsState) {
    // console.log('getNotiData ->', notiData)
    return (
        <div style={{overflow : "scroll", position : "absolute", top : '0', right : '50px', backgroundColor : "gray", width : '400px', height : '400px'}}>
            <ul>
                {
                    Object.values(notiData).map((ele:any, index:number)=> {
                        return (
                            <li key={index} className="list">
                                <div>
                                    시간 : {ele.create_at}<br />
                                    <div style={ele.is_checked ? {color : "green"} : {color : "red"}}>
                                        확인여부 : {JSON.stringify(ele.is_checked)} - <input type="button" onClick={(e)=> onDeleteHandle(e,ele._id)} value="X" />
                                    </div>
                                </div>
                                <div>
                                    작성자 : {ele.writer_id}
                                </div>
                                <div>
                                    내용 : {ele.noti_desc}<br />
                                </div>
                                <div>
                                    확인용 _id : {ele._id}
                                </div>
                                <hr />
                            </li>
                        )
                        
                    })
                }
            </ul>
        </div>
    )
}

export default NotificationView