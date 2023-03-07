import React,{useEffect, useState} from 'react';
import NotificationBadge from '../../components/notification/NotificationBadge';
import request from '../../utils/axios';

import { RootState } from '../../modules';
import { useDispatch, useSelector } from 'react-redux';
import { notiIsChecked } from '../../modules/notification';


function NotificationBadgeContainer({notiData, badge}:any) {
    const data = useSelector((state:RootState)=> state.notificationReducer);

    console.log('badge ->',data)
    // const [view,]

    const dispatch = useDispatch();



    

    return (
        <NotificationBadge 
            badge={badge}
            not_checked={data.not_checked}
        />
    )
}
export default NotificationBadgeContainer;