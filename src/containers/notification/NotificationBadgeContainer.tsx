import React,{useEffect, useState} from 'react';
import NotificationBadge from '../../components/notification/NotificationBadge';
import request from '../../utils/axios';

import { RootState } from '../../modules';
import { useDispatch, useSelector } from 'react-redux';


function NotificationBadgeContainer({badge}:any) {
    const data = useSelector((state:RootState)=> state.notificationReducer);

    return (
        <NotificationBadge 
            badge={badge}
            not_checked={data.not_checked}
        />
    )
}
export default NotificationBadgeContainer;