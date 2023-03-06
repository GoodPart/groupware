import React,{useEffect, useState} from 'react';
import NotificationBadge from '../../components/notification/NotificationBadge';
import request from '../../utils/axios';

function NotificationBadgeContainer({getAuth}:any) {
    console.log(getAuth)
    return (
        <NotificationBadge />
    )
}
export default NotificationBadgeContainer;