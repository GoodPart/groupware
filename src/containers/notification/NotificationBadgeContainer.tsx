import React,{useEffect, useState} from 'react';
import NotificationBadge from '../../components/notification/NotificationBadge';
import request from '../../utils/axios';

import { RootState } from '../../modules';
import { useDispatch, useSelector } from 'react-redux';
import { notiIsChecked } from '../../modules/notification';

// import {}


function NotificationBadgeContainer({notiData, badge}:any) {
    const {is_checked} = useSelector((state:RootState)=> state.notificationReducer);
    const [test, setTest] = useState(false);

    
    // console.log(notiData, badge)

    const dispatch = useDispatch();
    
    // useEffect(()=> {
    //     dispatch(notiIsChecked(notiData))
    //     setTest(is_checked)
    // },[is_checked])


    

    return (
        <NotificationBadge 
            badge={badge}
        />
    )
}
export default NotificationBadgeContainer;