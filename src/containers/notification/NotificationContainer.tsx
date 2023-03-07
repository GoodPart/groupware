import React, {useEffect, useState} from 'react';
import request from '../../utils/axios';

import { useDispatch } from 'react-redux';
import { deleteRequest } from '../../modules/notification';

import Notification from '../../components/notification/Notification';
import NotificationView from '../../components/notification/NotificationView';
import NotificationBadge from '../../components/notification/NotificationBadge';
import NotificationBadgeContainer from './NotificationBadgeContainer';



function NotificationContainer({getAuth, badge}:any) {
    const [notiData, setNotiData] = useState('');
    const dispatch = useDispatch();
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
      
        dispatch(deleteRequest(e,'.list',getAuth.userId, _id))
    }


    return notiData ? (
        <>
            {/* notification 아이콘 영역 */}
            <NotificationBadgeContainer
                notiData={notiData}
                badge={badge}
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