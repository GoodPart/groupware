import styled, {css} from 'styled-components'

import { RootState } from '../../modules';
import { useDispatch, useSelector } from 'react-redux';
import useDateHook from '../../hooks/useDateHook';

const NotificationWrap = styled.div<{display:string}>`
    overflow: auto;
    position: absolute;
    display: ${props => props.display === 'true' ? "block" : "none"};
    top : 0;
    right: 50px;
    background-color: #fff;
    width: 400px;
    height: 400px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 10px 0px;

    hr {
        margin: 0;
    }
`

const NotificationHeader = styled.div`
    h3 {
        width: 100%;
        text-align: center;
    }
    border-bottom: 1px solid #eee;
`
const NotificationList = styled.ol`
    padding: 0;
    margin : 0;
`

const NotificationListItem = styled.li`
    cursor: pointer;
    position: relative;
    margin : 0;
    border-bottom:  1px solid #eee;
    box-sizing: border-box;

    &:after {
        content: '';
        position: absolute;
        top : 0;
        left : 0;
        width : 4px;
        height: 100%;
        background-color: coral;
        transition: width .1s cubic-bezier(0.4, 0.96, 1, 1);
    }
    &:hover:after {
        width : 6px
    }
`
const NotificationListItemWrap = styled.div`
    display: flex;
    justify-content: space-between;
`
const NotificationListItemThumbNail = styled.div`
    position : relative;
    margin: 24px;
    width : 40px;
    height : 40px;
    border-radius : 25px;
    background-color : coral;
    margin-right : 8px;
`
const NotificationListItemInfo = styled.div`
    flex: 0.7;
    padding: 8px;
`
const InfoName = styled.div`
    font-size : 14px;
    font-weight: 700;
`

const InfoNotiAt = styled.div`
    flex: 0.2;
    align-self: center;
    text-align: center;
    font-style: italic;
    font-size : 10px;
    font-weight: 600;
    color : #bbb;
`


type PropsState = {
    onCheckHandle: (e:any,props:string)=>void,
    onDeleteHandle : (e:any,props:string)=>void,
    onViewPostHandle : (e:any, props:string)=>void,
    notifivationToggle:boolean
}

function NotificationView({onCheckHandle, onDeleteHandle, onViewPostHandle, notifivationToggle}:PropsState) {
    function SetDate (timestamp:any) {
        return useDateHook(timestamp);
    }
    
   

    let data = useSelector((state:RootState)=> state.notificationReducer.noti_list);
    return (
        <NotificationWrap display={String(notifivationToggle)} >
            <NotificationHeader>
                <h3>Notifications</h3>
            </NotificationHeader>
            <NotificationList>
                {
                    Object.values(data).map((ele:any, index:number)=> {
                        return (
                            <NotificationListItem key={index}>
                                <NotificationListItemWrap>
                                    <NotificationListItemThumbNail>
                                        <span style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", textTransform:"uppercase", fontSize:"24px", fontWeight:"bolder"}}>{ele.writer_id.slice(0,1)}</span>
                                    </NotificationListItemThumbNail>
                                
                                    <NotificationListItemInfo >
                                        <InfoName>
                                            {ele.writer_id}
                                        </InfoName>
                                        {ele.noti_desc}<br />
                                    </NotificationListItemInfo>

                                    <InfoNotiAt>
                                        {SetDate(ele.create_at)}
                                    </InfoNotiAt>

                                    {/* <div>
                                        시간 : <br />
                                        <div style={ele.is_checked ? {color : "green"} : {color : "red"}}>
                                            확인여부 : {JSON.stringify(ele.is_checked)} - <input type="button" onClick={(e)=> onViewPostHandle(e,ele.post_id)} value="내용 확인" /> <input type="button" onClick={(e)=> onCheckHandle(e,ele._id)} value="알림 확인" /> <input type="button" onClick={(e)=> onDeleteHandle(e,ele._id)} value="알림 제거" />
                                        </div>
                                    </div>
                                    <div>
                                        notification _id : {ele._id}
                                    </div>
                                    <div>
                                        post의 _id : {ele.post_id}
                                    </div> */}
                                </NotificationListItemWrap>
                            </NotificationListItem>
                        )
                        
                    })
                }
            </NotificationList>
        </NotificationWrap>
    )
}

export default NotificationView