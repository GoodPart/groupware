import React, {useEffect, useState} from 'react';
import request from '../../utils/axios';

import Notification from '../../components/notification/Notification';
import NotificationView from '../../components/notification/NotificationView';
import NotificationBadge from '../../components/notification/NotificationBadge';
import NotificationBadgeContainer from './NotificationBadgeContainer';


function NotificationContainer({getAuth}:any) {
    const [notiData, setNotiData] = useState('');
    useEffect(()=> {
        onReadNotificationList()
    }, [])

    const onReadNotificationList = () => {
        request('post', '/api/notification/get/user', {receiver_id : getAuth.userId})
        .then(res=> {
            setNotiData(res.find)
        })
    }

    const onCheckHandle = (e:any) => {
        console.log(e)
    }
    const onDeleteHandle = (e:any,_id:string) => {
        // console.log('delete',_id)
        console.log(e.target.closest(".list"))
        request('post', '/api/notification/delete', {receiver_id : getAuth.userId, _id : _id})
        .then(res=> {
            console.log(res)
            if(res.success) {
                e.target.closest(".list").remove()
            }
        })
    }


    return notiData ? (
        <>
            {/* notification 아이콘 영역 */}
            <NotificationBadgeContainer
                notiData={notiData}
            />
            {/* notification 뷰어 영역 */}
            <NotificationView 
                notiData={notiData}
                onCheckHandle={onCheckHandle}
                onDeleteHandle={onDeleteHandle}
            />
        </>
    ) : (
        <>loading ...</>
    ) 
}

export default NotificationContainer