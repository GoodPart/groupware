import styled, {css} from 'styled-components'

import { RootState } from '../../modules';
import { useDispatch, useSelector } from 'react-redux';
import useDateHook from '../../hooks/useDateHook';

const NotificationWrap = styled.div<{display:string}>`
    position: absolute;
    display: ${props => props.display === 'true' ? "block" : "none"};
    top : 64px;
    right: 50px;
    background-color: #fff;
    width: 400px;
    height: 400px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 10px 0px;
    font-family: 'Sono';

    hr {
        margin: 0;
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
const NotificationList = styled.ol`
    overflow: auto;
    height: calc(100% - 44px);
    padding: 0;
    margin : 0;
`

const NotificationListItem = styled.li<{checked:boolean}>`
    cursor: pointer;
    position: relative;
    margin : 0;
    border-bottom:  1px solid #ddd;
    box-sizing: border-box;
    opacity : ${props => props.checked ? 0.3 : 1};
    

    &:after {
        content: '';
        position: absolute;
        top : 12px;
        left : 12px;
        width : ${props=> props.checked ? 0 : '10px'};
        height: ${props=> props.checked ? 0 : '10px'};
        border-radius: 24px;
        background-color: #ff505c;
        transition: width, height .3s cubic-bezier(0.4, 0.96, 1, 1);
        
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
`
const NotificationListItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
    padding: 20px 0;

`
const InfoName = styled.div`
    font-size : 12px;
    font-weight: bold;
    color : #7c7272;
`
const InfoType = styled.div`
    font-size : 12px;
    font-weight: 600;
    color : #7c7272;

    span.heigh-light {
        color : #ff505c
    }
`
const InfoActionAt = styled.div`
    font-size : 10px;
    font-weight: 400;
    color : #7c7272;
`
const InfoNotiAt = styled.div`
    
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
                            <NotificationListItem key={index} checked={ele.is_checked} onClick={(e)=> {onViewPostHandle(e,ele.post_id);onCheckHandle(e,ele._id)}}>
                                <NotificationListItemWrap>
                                    <NotificationListItemThumbNail>
                                        <span style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", textTransform:"uppercase", fontSize:"24px", fontWeight:"bolder"}}>{ele.writer_id.slice(0,1)}</span>
                                    </NotificationListItemThumbNail>
                                
                                    <NotificationListItemInfo >
                                        <InfoName>
                                            {ele.writer_id}
                                        </InfoName>
                                        <InfoType>
                                            <span className='heigh-light'>{ele.noti_type}</span> on your post
                                            {/* {ele.noti_desc} */}
                                        </InfoType>
                                        <InfoActionAt>
                                            {SetDate(ele.create_at)}
                                            {/* <input type="button"  value='상태 변경' onClick={(e)=> onCheckHandle(e,ele._id)} /> */}
                                            <input type="button"  value='제거' onClick={(e)=> onDeleteHandle(e,ele._id)} />
                                        </InfoActionAt>

                                    </NotificationListItemInfo>

                                    

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