import React, {useEffect, useState, useCallback} from 'react';
import request from '../../utils/axios';

import { RootState } from '../../modules';
import { useDispatch, useSelector } from 'react-redux';
import { notiBadgeInfo,deleteRequest, updateCheckedRequest, getNotiList } from '../../modules/notification';
import {viewPost} from '../../modules/chat'

import Notification from '../../components/notification/Notification';
import NotificationView from '../../components/notification/NotificationView';
import NotificationBadge from '../../components/notification/NotificationBadge';
import NotificationBadgeContainer from './NotificationBadgeContainer';



function NotificationContainer({getAuth, badge}:any) {
    const [notifivationToggle, setNotifivationToggle] = useState(true);
    const dispatch = useDispatch();
    
    useEffect(()=> {
        onReadNotificationList()
    }, [])

    
    const onReadNotificationList = () => {
        // noti table에 로그인 유저 이름으로 조회
        request('post', '/api/notification/get/user', {receiver_id : getAuth.userId})
        .then(res=> {
            // 조회된 알림 오브젝트 리스트를 dispatch하여 알림 상태 및 읽지않은 알림 store값을 갱신 시킨다.
            dispatch(notiBadgeInfo(res.find))

            return console.log('reading...')
        })
    }

    //useCallback + 리덕스 텅크를 사용하여 비동기 상태 변화를 진행함.
    const onCheckHandle = useCallback((e:any,_id:string)=> {
        //dispatch를 실행하면 dispatch와 updateCheckedRequest를 사용하여 비동기 액션 함수가 실행됨
        dispatch(updateCheckedRequest(getAuth.userId, _id))
    }, [dispatch])

    const onDeleteHandle = useCallback((e:any,_id:string)=> {
        dispatch(deleteRequest(getAuth.userId, _id))
    }, [dispatch]) 
    const onViewPostHandle = useCallback((e:any, _id:string)=> {
        dispatch(viewPost(_id))
    }, [dispatch])

    const notificationOnToggle = useCallback((e:any)=> {
        let checked = e.currentTarget.checked;
        setNotifivationToggle(checked)
    }, [notifivationToggle])

    /*
        상태가 갱신되면 아래 container 컴포넌트에서 useSelector로 필요한 값을 조회 후 사용한다.
        비동기로 바로바로 값이 변경되는걸 볼 수 있다.

        <NotificationView /> 
        NotificationView 컴포넌트의 경우, notification 리스트를 상태 값에 넣어 변경 될때마다 
        해당 오브젝트 리스트를 업데이트 해주었다.
    */
    return (
        <>
            {/* notification 아이콘 영역 */}
            <NotificationBadgeContainer
                badge={badge}
                notificationOnToggle={notificationOnToggle}
            />
            {/* notification 뷰어 영역 */}
            <NotificationView 
                onCheckHandle={onCheckHandle}
                onDeleteHandle={onDeleteHandle}
                onViewPostHandle={onViewPostHandle}
                notifivationToggle={notifivationToggle}
            />
        </>
    ) 
}

export default NotificationContainer