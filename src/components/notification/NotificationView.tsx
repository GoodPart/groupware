import { RootState } from '../../modules';
import { useDispatch, useSelector } from 'react-redux';

type PropsState = {
    onCheckHandle: (e:any,props:string)=>void,
    onDeleteHandle : (e:any,props:string)=>void,
    onViewPostHandle : (e:any, props:string)=>void
}

function NotificationView({onCheckHandle, onDeleteHandle, onViewPostHandle}:PropsState) {
    let data = useSelector((state:RootState)=> state.notificationReducer.noti_list);
    return (
        <div style={{overflow : "scroll", position : "absolute", top : '0', right : '50px', backgroundColor : "gray", width : '400px', height : '400px'}}>
            <ul>
                {
                    Object.values(data).map((ele:any, index:number)=> {
                        return (
                            <li key={index} className="list">
                                <div>
                                    시간 : {ele.create_at}<br />
                                    <div style={ele.is_checked ? {color : "green"} : {color : "red"}}>
                                        확인여부 : {JSON.stringify(ele.is_checked)} - <input type="button" onClick={(e)=> onViewPostHandle(e,ele.post_id)} value="내용 확인" /> <input type="button" onClick={(e)=> onCheckHandle(e,ele._id)} value="알림 확인" /> <input type="button" onClick={(e)=> onDeleteHandle(e,ele._id)} value="알림 제거" />
                                    </div>
                                </div>
                                <div>
                                    작성자 : {ele.writer_id}
                                </div>
                                <div>
                                    내용 : {ele.noti_desc}<br />
                                </div>
                                <div>
                                    notification _id : {ele._id}
                                </div>
                                <div>
                                    post의 _id : {ele.post_id}
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